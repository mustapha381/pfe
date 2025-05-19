const db = require("../config/db");

const addCommande = (req, res) => {
  const { fournisseur_id, produits, statut } = req.body;

  let total = 0;
  produits.forEach(p => {
    total += (p.prix_achat || 0) * p.quantity;
  });

  const sqlCommande = `
    INSERT INTO commandes_fournisseurs (fournisseur_id, statut, total)
    VALUES (?, ?, ?)
  `;
  db.query(sqlCommande, [fournisseur_id, statut, total], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur ajout commande fournisseur" });

    const commande_id = result.insertId;

    produits.forEach(({ produit_id, quantity, prix_achat }) => {
      const sqlProduit = `
        INSERT INTO commandes_fournisseurs_produits (commande_id, produit_id, quantity, prix_achat)
        VALUES (?, ?, ?, ?)
      `;
      db.query(sqlProduit, [commande_id, produit_id, quantity, prix_achat], (err) => {
        if (err) console.error("Erreur ajout produit à la commande fournisseur", err);

        // Mise à jour du stock : augmentation
        const sqlUpdateStock = `
          UPDATE produits
          SET quantity = quantity + ?
          WHERE id = ?
        `;
        db.query(sqlUpdateStock, [quantity, produit_id], (err) => {
          if (err) console.error("Erreur mise à jour stock fournisseur", err);
        });
      });
    });

    res.status(201).json({ message: "Commande fournisseur ajoutée", id: commande_id });
  });
};


const getCommandes = (req, res) => {
  const sql = `
    SELECT cf.id, cf.date_commande, f.nom, f.tel, f.email,
           GROUP_CONCAT(CONCAT(p.name, ' x', cfp.quantity, ' (', cfp.prix_achat, '€/u)') SEPARATOR ', ') AS produits,
           cf.total, cf.statut
    FROM commandes_fournisseurs cf
    JOIN fournisseurs f ON cf.fournisseur_id = f.id
    JOIN commandes_fournisseurs_produits cfp ON cf.id = cfp.commande_id
    JOIN produits p ON cfp.produit_id = p.id
    GROUP BY cf.id
    ORDER BY cf.date_commande DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur récupération commandes fournisseurs" });
    res.status(200).json(result);
  });
};

const deleteCommande = (req, res) => {
  const id = req.params.id;

  // Supprimer les produits de la commande
  db.query("DELETE FROM commandes_fournisseurs_produits WHERE commande_id = ?", [id], err => {
    if (err) return res.status(500).json({ message: "Erreur suppression produits commande" });

    // Supprimer la commande elle-même
    db.query("DELETE FROM commandes_fournisseurs WHERE id = ?", [id], err => {
      if (err) return res.status(500).json({ message: "Erreur suppression commande" });
      res.status(200).json({ message: "Commande fournisseur supprimée" });
    });
  });
};

module.exports = { addCommande, getCommandes, deleteCommande };