const db = require("../config/db");

const addCommande = (req, res) => {
  const { client_id, produits, paiement } = req.body;

  const ids = produits.map(p => p.produit_id);
  const sqlPrix = `SELECT id, price FROM produits WHERE id IN (?)`;

  db.query(sqlPrix, [ids], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur récupération prix" });

    let total = 0;
    for (const produit of produits) {
      const prixUnitaire = results.find(p => p.id === produit.produit_id)?.price || 0;
      total += prixUnitaire * produit.quantity;
    }

    const sqlCommande = `
      INSERT INTO commandes_clients (client_id, paiement, total)
      VALUES (?, ?, ?)
    `;
    db.query(sqlCommande, [client_id, paiement, total], (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur ajout commande" });

      const commande_id = result.insertId;

      produits.forEach(({ produit_id, quantity }) => {
        const sqlProduit = `
          INSERT INTO commandes_produits (commande_id, produit_id, quantity)
          VALUES (?, ?, ?)
        `;
        db.query(sqlProduit, [commande_id, produit_id, quantity]);
      });

      res.status(201).json({ message: "Commande ajoutée", id: commande_id });
    });
  });
};

const getCommandes = (req, res) => {
  const sql = `
    SELECT cc.id, cc.date_commande, c.nom, c.prenom, c.email, c.age,
           GROUP_CONCAT(CONCAT(p.name, ' x', cp.quantity) SEPARATOR ', ') AS produits,
           cc.total, cc.paiement
    FROM commandes_clients cc
    JOIN clients c ON cc.client_id = c.id
    JOIN commandes_produits cp ON cc.id = cp.commande_id
    JOIN produits p ON cp.produit_id = p.id
    GROUP BY cc.id
    ORDER BY cc.date_commande DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur récupération commandes" });
    res.status(200).json(result);
  });
};

const deleteCommande = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM commandes_produits WHERE commande_id = ?", [id], err => {
    if (err) return res.status(500).json({ message: "Erreur suppression produits commande" });

    db.query("DELETE FROM commandes_clients WHERE id = ?", [id], err => {
      if (err) return res.status(500).json({ message: "Erreur suppression commande" });
      res.status(200).json({ message: "Commande supprimée" });
    });
  });
};

module.exports = { addCommande, getCommandes, deleteCommande };
