import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFournisseur() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    email: "",
    telephone: "",
    specialite: "", // Nouveau champ
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Données à envoyer :", formData);

    try {
      const res = await axios.post("http://localhost:3001/api/fournisseurs", formData);
      console.log("✅ Réponse backend :", res.data);

      if (res.status === 201) {
        console.log("Fournisseur ajouté avec succès !");
        navigate("/dashboard/fournisseurs");
      } else {
        console.log("⚠️ Échec de l'ajout du fournisseur.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout :", err.response?.data || err.message);
      alert("Erreur lors de l'ajout du fournisseur. Regarde la console.");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Ajouter un Fournisseur</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          name="adresse"
          placeholder="Adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        <input
          name="specialite"
          placeholder="Spécialité"
          value={formData.specialite}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-green">Ajouter</button>
      </form>
    </div>
  );
}

export default AddFournisseur;
