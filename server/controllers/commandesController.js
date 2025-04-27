const db = require("../config/db");

const addCommande = async (req, res) => {
  const { client_id, produits, statut_paiement } = req.body;

  if (!client_id || !produits || produits.length === 0) {
    return res.status(400).json({ message: "Données incomplètes pour la commande." });
  }

  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const insertCommandeSql = `
      INSERT INTO commandes (client_id, statut_commande, total, statut_paiement) 
      VALUES (?, 'en cours', 0, ?)
    `;
    const [commandeResult] = await connection.query(insertCommandeSql, [client_id, statut_paiement]);
    const commandeId = commandeResult.insertId;

    let totalCommande = 0;

    for (const prod of produits) {
      const [productRows] = await connection.query(
        "SELECT quantity, price FROM products WHERE id = ?", 
        [prod.produit_id]
      );

      if (productRows.length === 0) {
        throw new Error("Produit non trouvé.");
      }

      const produit = productRows[0];

      if (produit.quantity < prod.quantite) {
        throw new Error(`Stock insuffisant pour le produit ID ${prod.produit_id}`);
      }

      const prixUnitaire = produit.price;
      totalCommande += prixUnitaire * prod.quantite;

      await connection.query(
        "INSERT INTO details_commandes (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)",
        [commandeId, prod.produit_id, prod.quantite, prixUnitaire]
      );

      await connection.query(
        "UPDATE products SET quantity = quantity - ? WHERE id = ?",
        [prod.quantite, prod.produit_id]
      );
    }

    await connection.query(
      "UPDATE commandes SET total = ? WHERE id = ?",
      [totalCommande, commandeId]
    );

    await connection.commit();
    res.status(201).json({ message: "Commande créée avec succès", id: commandeId });

  } catch (err) {
    console.error("❌ Erreur création commande :", err.message);
    if (connection) await connection.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

const getCommandes = (req, res) => {
  const sql = `
    SELECT c.id, c.date_commande, cl.nom, cl.prenom, c.total, c.statut_commande, c.statut_paiement
    FROM commandes c
    JOIN clients cl ON c.client_id = cl.id
    ORDER BY c.date_commande DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Erreur récupération commandes :", err.message);
      return res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
    res.status(200).json(result);
  });
};

const getCommandeDetails = (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT p.name, d.quantite, d.prix_unitaire
    FROM details_commandes d
    JOIN products p ON d.produit_id = p.id
    WHERE d.commande_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur récupération détails commande :", err.message);
      return res.status(500).json({ message: "Erreur lors de la récupération des détails de la commande" });
    }
    res.status(200).json(result);
  });
};

module.exports = {
  addCommande,
  getCommandes,
  getCommandeDetails
};
