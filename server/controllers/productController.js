const db = require("../config/db");

const addProduct = (req, res) => {
  const { name, description, category, quantity, price } = req.body;
  const sql = "INSERT INTO produits (name, description, category, quantity, price) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, description, category, quantity, price], (err, result) => {
    if (err) {
      console.error("❌ Erreur ajout produit :", err.message);
      return res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
    }
    console.log("✅ Produit ajouté :", result.insertId);
    res.status(201).json({ message: "Produit ajouté avec succès", id: result.insertId });
  });
};

const getProducts = (req, res) => {
  const sql = "SELECT * FROM produits";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Erreur récupération produits :", err.message);
      return res.status(500).json({ message: "Erreur lors de la récupération des produits" });
    }
    res.status(200).json(result);
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM produits WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur suppression produit :", err.message);
      return res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
    res.status(200).json({ message: "Produit supprimé avec succès" });
  });
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct
};
