const db = require('../config/db');

const getStockActuel = (req, res) => {
  const sql = `
    SELECT 
      p.id, 
      p.nom, 
      IFNULL(entrees.total_entree, 0) - IFNULL(sorties.total_sortie, 0) AS quantite
    FROM produits p
    LEFT JOIN (
      SELECT produit_id, SUM(quantite) AS total_entree
      FROM commandes_fournisseurs
      GROUP BY produit_id
    ) entrees ON p.id = entrees.produit_id
    LEFT JOIN (
      SELECT JSON_EXTRACT(produits, '$[*].id') AS produit_ids, produits
      FROM commandes_clients
    ) sorties_json ON JSON_CONTAINS(sorties_json.produit_ids, JSON_QUOTE(CAST(p.id AS CHAR)))
    LEFT JOIN (
      SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(produits, CONCAT('$[', idx.i, '].id'))) AS produit_id,
        JSON_UNQUOTE(JSON_EXTRACT(produits, CONCAT('$[', idx.i, '].quantite'))) AS quantite
      FROM commandes_clients,
      JSON_TABLE(
        JSON_LENGTH(produits),
        "$" COLUMNS(i FOR ORDINALITY)
      ) AS idx
    ) sorties
    ON sorties.produit_id = p.id
    GROUP BY p.id, p.nom;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur récupération stock :", err.message);
      return res.status(500).json({ message: "Erreur récupération stock" });
    }
    res.status(200).json(result);
  });
};

module.exports = { getStockActuel };
