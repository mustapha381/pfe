import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });

  // Charger les données du produit existant
  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Erreur chargement :", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, formData);
      alert("✅ Produit modifié avec succès !");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Erreur update :", err);
      alert("❌ Échec de la modification");
    }
  };

  return (
    <div className="form-container">
      <h2>✏️ Modifier le Produit</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Catégorie" required />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantité" required />
        <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Prix" required />
        <button type="submit" className="btn btn-blue">💾 Enregistrer</button>
      </form>
    </div>
  );
}

export default EditProduct;

