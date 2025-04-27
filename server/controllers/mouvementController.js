const db = require("../config/db");

// GET - Récupérer tous les mouvements
const getMouvements = (req, res) => {
  const sql = "SELECT * FROM mouvements ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Erreur GET mouvements :", err.message);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(result);
  });
};

// POST - Ajouter un mouvement
const addMouvement = (req, res) => {
  const { produit, type, quantite, date } = req.body;
  const sql = "INSERT INTO mouvements (produit, type, quantite, date) VALUES (?, ?, ?, ?)";
  db.query(sql, [produit, type, quantite, date], (err, result) => {
    if (err) {
      console.error("❌ Erreur POST mouvement :", err.message);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json({ id: result.insertId, produit, type, quantite, date });
  });
};

module.exports = {
  getMouvements,
  addMouvement
};
