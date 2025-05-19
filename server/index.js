const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // ✅ Ajout pour gérer les chemins

const mouvementRoutes = require("./routes/mouvementRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const commandeClientRoutes = require("./routes/commandeClientRoutes");
const fournisseursRoutes = require("./routes/fournisseursRoutes");
const commandeFournisseurRoutes = require("./routes/commandeFournisseurRoutes");
const produitRoutes = require('./routes/produitRoutes');



const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Sert les fichiers du dossier "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/mouvements", mouvementRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/commandes-clients", commandeClientRoutes);
app.use("/api/fournisseurs", fournisseursRoutes);
app.use("/api/commandes-fournisseurs", commandeFournisseurRoutes);
app.use('/api/produits', produitRoutes);



// Route de test
app.get("/", (req, res) => {
  res.send("✅ API en ligne !");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
