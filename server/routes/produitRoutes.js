// routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET tous les produits (pour stock)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM produits';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(result);
  });
});

module.exports = router;
