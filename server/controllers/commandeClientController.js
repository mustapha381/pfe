const db = require("../config/db");

const addCommande = (req, res) => {
  const { client_id, produits, paiement } = req.body;

  const ids = produits.map(p => p.produit_id);
  const sqlPrix = `SELECT id, price, quantity FROM produits WHERE id IN (?)`;

  db.query(sqlPrix, [ids], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur récupération prix" });

    let total = 0;
    for (const produit of produits) {
      const produitInfo = results.find(p => p.id === produit.produit_id);
      const prixUnitaire = produitInfo?.price || 0;
      const stockDisponible = produitInfo?.quantity || 0;

      // Vérifier si le stock est suffisant
      if (stockDisponible < produit.quantity) {
        return res.status(400).json({ message: `Stock insuffisant pour le produit ${produit.produit_id}` });
      }

      total += prixUnitaire * produit.quantity;
    }

    // Ajouter la commande
    const sqlCommande = `
      INSERT INTO commandes_clients (client_id, paiement, total)
      VALUES (?, ?, ?)
    `;
    db.query(sqlCommande, [client_id, paiement, total], (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur ajout commande" });

      const commande_id = result.insertId;

      // Ajouter les produits à la commande et mettre à jour le stock
      produits.forEach(({ produit_id, quantity }) => {
        const sqlProduit = `
          INSERT INTO commandes_produits (commande_id, produit_id, quantity)
          VALUES (?, ?, ?)
        `;
        db.query(sqlProduit, [commande_id, produit_id, quantity], (err) => {
          if (err) return console.error("Erreur ajout produit à la commande", err);

          // Mettre à jour le stock du produit
          const sqlUpdateStock = `
            UPDATE produits
            SET quantity = quantity - ?
            WHERE id = ?
          `;
          db.query(sqlUpdateStock, [quantity, produit_id], (err) => {
            if (err) console.error("Erreur mise à jour stock", err);
          });
        });
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

  // Récupérer les produits pour remettre à jour le stock
  const sqlProduits = `
    SELECT cp.produit_id, cp.quantity
    FROM commandes_produits cp
    WHERE cp.commande_id = ?
  `;
  db.query(sqlProduits, [id], (err, produits) => {
    if (err) return res.status(500).json({ message: "Erreur récupération produits commande" });

    // Remettre à jour le stock pour chaque produit de la commande supprimée
    produits.forEach(({ produit_id, quantity }) => {
      const sqlUpdateStock = `
        UPDATE produits
        SET quantity = quantity + ?
        WHERE id = ?
      `;
      db.query(sqlUpdateStock, [quantity, produit_id], (err) => {
        if (err) console.error("Erreur mise à jour stock lors de la suppression", err);
      });
    });

    // Supprimer les produits de la commande
    db.query("DELETE FROM commandes_produits WHERE commande_id = ?", [id], err => {
      if (err) return res.status(500).json({ message: "Erreur suppression produits commande" });

      // Supprimer la commande elle-même
      db.query("DELETE FROM commandes_clients WHERE id = ?", [id], err => {
        if (err) return res.status(500).json({ message: "Erreur suppression commande" });
        res.status(200).json({ message: "Commande supprimée" });
      });
    });
  });
};

module.exports = { addCommande, getCommandes, deleteCommande };
