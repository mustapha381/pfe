import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFournisseur() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    specialite: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/fournisseurs", formData);
      if (res.status === 201) {
        navigate("/dashboard/fournisseurs");
      }
    } catch (err) {
      console.error("Erreur ajout fournisseur :", err);
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Ajouter un Fournisseur</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="tel" placeholder="Téléphone" value={formData.tel} onChange={handleChange} required />
        <input name="specialite" placeholder="Spécialité" value={formData.specialite} onChange={handleChange} required />
        <button type="submit" className="btn btn-green">Ajouter</button>
      </form>
    </div>
  );
}

export default AddFournisseur;
