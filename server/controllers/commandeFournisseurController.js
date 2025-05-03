const db = require("../config/db");

// ✅ Ajouter une commande fournisseur
const addCommande = (req, res) => {
  const { produit, quantite, prix, id_fournisseur } = req.body;
  const date_commande = new Date();

  const sql = `
    INSERT INTO commandes_fournisseurs 
    (produit, quantite, prix, date_commande, id_fournisseur)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [produit, quantite, prix, date_commande, id_fournisseur], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur lors de l'ajout de la commande" });
    }
    res.status(201).json({ message: "Commande ajoutée avec succès", id: result.insertId });
  });
};

// ✅ Récupérer toutes les commandes avec info fournisseur
const getCommandes = (req, res) => {
  const sql = `
    SELECT cf.*, f.nom AS nom_fournisseur, f.prenom AS prenom_fournisseur, f.email AS email_fournisseur
    FROM commandes_fournisseurs cf
    JOIN fournisseurs f ON cf.id_fournisseur = f.id
    ORDER BY cf.date_commande DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
    res.status(200).json(results);
  });
};

// ✅ Récupérer une commande spécifique
const getCommandeById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT cf.*, f.nom AS nom_fournisseur, f.prenom AS prenom_fournisseur, f.email AS email_fournisseur
    FROM commandes_fournisseurs cf
    JOIN fournisseurs f ON cf.id_fournisseur = f.id
    WHERE cf.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur lors de la récupération de la commande" });
    }
    if (result.length === 0) return res.status(404).json({ message: "Commande non trouvée" });
    res.status(200).json(result[0]);
  });
};

// ✅ Modifier une commande
const updateCommande = (req, res) => {
  const { id } = req.params;
  const { produit, quantite, prix, id_fournisseur } = req.body;

  const sql = `
    UPDATE commandes_fournisseurs 
    SET produit = ?, quantite = ?, prix = ?, id_fournisseur = ?
    WHERE id = ?
  `;

  db.query(sql, [produit, quantite, prix, id_fournisseur, id], (err) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur lors de la mise à jour de la commande" });
    }
    res.status(200).json({ message: "Commande mise à jour avec succès" });
  });
};

// ✅ Supprimer une commande
const deleteCommande = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM commandes_fournisseurs WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur lors de la suppression de la commande" });
    }
    res.status(200).json({ message: "Commande supprimée avec succès" });
  });
};

module.exports = {
  addCommande,
  getCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
};
