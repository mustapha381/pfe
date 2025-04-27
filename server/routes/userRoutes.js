const express = require("express");
const router = express.Router();
const db = require("../db");

// Enregistrement d'un utilisateur
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'inscription :", err);
      return res.status(500).json({ message: "Erreur lors de l'inscription" });
    }

    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  });
});

module.exports = router;
