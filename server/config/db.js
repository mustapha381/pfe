const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ton mot de passe
  database: "testdb", // le nom de ta base
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error("❌ Échec de la connexion à la base de données :", err.message);
  } else {
    console.log("✅ Connexion réussie à MySQL");
  }
});

module.exports = db;
