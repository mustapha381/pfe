const db = require("../config/db");

const addFournisseur = (req, res) => {
  const { nom, prenom, email, tel, specialite } = req.body;
  const sql = "INSERT INTO fournisseurs (nom, prenom, email, tel, specialite) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nom, prenom, email, tel, specialite], (err, result) => {
    if (err) {
      console.error("Erreur ajout fournisseur :", err.message);
      return res.status(500).json({ message: "Erreur ajout fournisseur" });
    }
    res.status(201).json({ message: "Fournisseur ajouté", id: result.insertId });
  });
};

const getFournisseurs = (req, res) => {
  const sql = "SELECT * FROM fournisseurs";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur récupération fournisseurs :", err.message);
      return res.status(500).json({ message: "Erreur récupération" });
    }
    res.status(200).json(result);
  });
};

const deleteFournisseur = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM fournisseurs WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Erreur suppression fournisseur :", err.message);
      return res.status(500).json({ message: "Erreur suppression" });
    }
    res.status(200).json({ message: "Fournisseur supprimé" });
  });
};

const updateFournisseur = (req, res) => {
  const id = req.params.id;
  const { nom, prenom, email, tel, specialite } = req.body;
  const sql = "UPDATE fournisseurs SET nom = ?, prenom = ?, email = ?, tel = ?, specialite = ? WHERE id = ?";
  db.query(sql, [nom, prenom, email, tel, specialite, id], (err) => {
    if (err) {
      console.error("Erreur update fournisseur :", err.message);
      return res.status(500).json({ message: "Erreur update" });
    }
    res.status(200).json({ message: "Fournisseur mis à jour" });
  });
};

module.exports = {
  addFournisseur,
  getFournisseurs,
  deleteFournisseur,
  updateFournisseur,
};
