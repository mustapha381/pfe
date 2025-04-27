const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // ✅ Ajout pour gérer les chemins

const mouvementRoutes = require("./routes/mouvementRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const commandesRoutes = require('./routes/commandes');
const fournisseursRoutes = require("./routes/fournisseurs");

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
app.use('/api/commandes', commandesRoutes);
app.use("/api/fournisseurs", fournisseursRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("✅ API en ligne !");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
