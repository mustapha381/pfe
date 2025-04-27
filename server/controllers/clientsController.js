const db = require("../config/db");

const addClient = (req, res) => {
  const { nom, prenom, age, email } = req.body;
  const sql = "INSERT INTO clients (nom, prenom, age, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [nom, prenom, age, email], (err, result) => {
    if (err) {
      console.error("❌ Erreur ajout client :", err.message);
      return res.status(500).json({ message: "Erreur lors de l'ajout du client" });
    }
    console.log("✅ Client ajouté :", result.insertId);
    res.status(201).json({ message: "Client ajouté avec succès", id: result.insertId });
  });
};

const getClients = (req, res) => {
  const sql = "SELECT * FROM clients";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Erreur récupération clients :", err.message);
      return res.status(500).json({ message: "Erreur lors de la récupération des clients" });
    }
    res.status(200).json(result);
  });
};

const deleteClient = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM clients WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur suppression client :", err.message);
      return res.status(500).json({ message: "Erreur lors de la suppression du client" });
    }
    res.status(200).json({ message: "Client supprimé avec succès" });
  });
};

const updateClient = (req, res) => {
  const id = req.params.id;
  const { nom, prenom, age, email } = req.body;
  const sql = "UPDATE clients SET nom = ?, prenom = ?, age = ?, email = ? WHERE id = ?";
  db.query(sql, [nom, prenom, age, email, id], (err, result) => {
    if (err) {
      console.error("❌ Erreur mise à jour client :", err.message);
      return res.status(500).json({ message: "Erreur lors de la mise à jour du client" });
    }
    res.status(200).json({ message: "Client mis à jour avec succès" });
  });
};

module.exports = {
  addClient,
  getClients,
  deleteClient,
  updateClient
};
