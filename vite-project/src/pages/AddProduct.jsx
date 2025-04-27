import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Données à envoyer :", formData); // Ajout d'un log pour les données à envoyer

    try {
      const res = await axios.post("http://localhost:3001/api/products", formData);
      console.log("✅ Réponse backend :", res.data); // Ajout d'un log pour la réponse du backend

      // Vérification de la réponse du backend avant de rediriger
      if (res.status === 201) {
        console.log("Produit ajouté avec succès !");
        navigate("/dashboard/products"); // Redirige vers la liste des produits
      } else {
        console.log("Échec de l'ajout du produit.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout :", err.response?.data || err.message);
      alert("Erreur lors de l'ajout du produit. Vérifie la console.");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Ajouter un Produit</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Catégorie"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Stock Disponible"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Prix Unitaire (€)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-green">Ajouter</button>
      </form>
    </div>
  );
}

export default AddProduct;
