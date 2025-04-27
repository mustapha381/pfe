import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Données à envoyer :", formData); // Log pour debug

    try {
      const res = await axios.post("http://localhost:3001/api/clients", formData);
      console.log("✅ Réponse backend :", res.data); // Log la réponse backend

      if (res.status === 201) {
        console.log("Client ajouté avec succès !");
        navigate("/dashboard/clients"); // Redirection après ajout
      } else {
        console.log("⚠️ Échec de l'ajout du client.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout :", err.response?.data || err.message);
      alert("Erreur lors de l'ajout du client. Regarde la console.");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Ajouter un Client</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Âge"
          value={formData.age}
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
        <button type="submit" className="btn btn-green">Ajouter</button>
      </form>
    </div>
  );
}

export default AddClient;
