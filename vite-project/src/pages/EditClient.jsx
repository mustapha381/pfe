import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    email: "",
  });

  // Charger les données du client existant
  useEffect(() => {
    axios.get(`http://localhost:3001/api/clients/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Erreur chargement client :", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/clients/${id}`, formData);
      alert("✅ Client modifié avec succès !");
      navigate("/dashboard/clients");
    } catch (err) {
      console.error("Erreur update client :", err);
      alert("❌ Échec de la modification du client");
    }
  };

  return (
    <div className="form-container">
      <h2>✏️ Modifier le Client</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Âge"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit" className="btn btn-blue">💾 Enregistrer</button>
      </form>
    </div>
  );
}

export default EditClient;
