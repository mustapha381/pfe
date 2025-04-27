const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Liste des fournisseurs
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM fournisseurs");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération fournisseurs" });
  }
});

// Supprimer fournisseur
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM fournisseurs WHERE id = ?", [req.params.id]);
    res.json({ message: "Fournisseur supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression fournisseur" });
  }
});

module.exports = router;
