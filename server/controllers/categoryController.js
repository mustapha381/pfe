const db = require("../config/db");

// Récupère toutes les catégories avec leurs produits
const getCategories = (req, res) => {
  const sql = `
    SELECT c.id AS categoryId, c.name AS categoryName, 
           p.id AS productId, p.name AS productName, p.price, p.image, p.quality
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur récupération catégories :", err.message);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    // Regroupe les produits par catégorie
    const categories = {};
    results.forEach(row => {
      if (!categories[row.categoryId]) {
        categories[row.categoryId] = {
          id: row.categoryId,
          name: row.categoryName,
          products: []
        };
      }
      if (row.productId) {
        categories[row.categoryId].products.push({
          id: row.productId,
          name: row.productName,
          price: row.price,
          image: row.image ? `http://localhost:3001/uploads/${row.image}` : null, // Ajouter le chemin complet
          quality: row.quality
        });
      }
    });

    res.status(200).json(Object.values(categories));
  });
};

// Récupère les produits d’une catégorie spécifique
const getProductsByCategory = (req, res) => {
  const categoryId = req.params.id;
  const sql = `
    SELECT p.id, p.name, p.price, p.image, p.quality
    FROM products p
    WHERE p.category_id = ?
  `;

  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error("❌ Erreur récupération produits :", err.message);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    // Ajoute le chemin complet pour chaque image
    const productsWithFullImagePath = results.map(product => ({
      ...product,
      image: product.image ? `http://localhost:3001/uploads/${product.image}` : null  // Chemin complet de l'image
    }));

    res.status(200).json(productsWithFullImagePath);
  });
};

module.exports = {
  getCategories,
  getProductsByCategory
};
