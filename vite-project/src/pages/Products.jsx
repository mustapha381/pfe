import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3001/api/products/${id}`);
    fetchProducts();
  };

  // Commande client : vente = stock diminue
  const handleVente = async (produit) => {
    try {
      const commandeClient = {
        client_id: 1, // Tu peux rendre cela dynamique plus tard
        produits: [
          {
            produit_id: produit.id,
            quantity: 1 // Vendre 1 unité par défaut
          }
        ]
      };

      // Envoi de la commande client
      await axios.post("http://localhost:3001/api/commandes-clients", commandeClient);

      // Mise à jour du stock
      await axios.patch(`http://localhost:3001/api/products/${produit.id}`, {
        quantity: produit.quantity - 1
      });

      fetchProducts();
      alert(`✅ Vente enregistrée pour "${produit.name}"`);
    } catch (err) {
      alert("❌ Erreur lors de la vente");
      console.error(err);
    }
  };

  // Commande fournisseur : achat = stock augmente
  const handleAchat = async (produit) => {
    try {
      const commandeFournisseur = {
        fournisseur_id: 1, // Tu peux rendre cela dynamique plus tard
        produits: [
          {
            produit_id: produit.id,
            quantity: 5 // Réapprovisionnement de 5 unités par défaut
          }
        ]
      };

      // Envoi de la commande fournisseur
      await axios.post("http://localhost:3001/api/commandes-fournisseurs", commandeFournisseur);

      // Mise à jour du stock
      await axios.patch(`http://localhost:3001/api/products/${produit.id}`, {
        quantity: produit.quantity + 5
      });

      fetchProducts();
      alert(`✅ Réapprovisionnement effectué pour "${produit.name}"`);
    } catch (err) {
      alert("❌ Erreur lors de l'approvisionnement");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h1>Dashboard Admin</h1>
      <div className="section">
        <div className="section-header">
          <h3>🗂️ Liste des Produits</h3>
          <button className="btn btn-green" onClick={() => navigate("/dashboard/products/add")}>
            Ajouter des produits
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Stock</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  {prod.name}
                  {prod.quantity < 20 && <span className="badge-stock-faible">Stock faible</span>}
                </td>
                <td>{prod.category}</td>
                <td>{prod.quantity}</td>
                <td>{prod.price} €</td>
                <td>
                  <button className="btn btn-blue" onClick={() => navigate(`/dashboard/products/edit/${prod.id}`)}>Modifier</button>
                  <button className="btn btn-red" onClick={() => deleteProduct(prod.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-blue-outline" onClick={() => navigate("/dashboard/categories")}>
          Liste des catégories
        </button>
      </div>
    </div>
  );
}

export default Products;
