import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddCommandeFournisseur.css"; // Assurez-vous que le chemin vers le fichier CSS est correct

const AddCommandeFournisseur = () => {
  const [form, setForm] = useState({
    produit: "",
    quantite: "",
    prix: "",
    id_fournisseur: ""
  });
  const [fournisseurs, setFournisseurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/fournisseurs")
      .then(res => setFournisseurs(res.data))
      .catch(err => console.error("Erreur récupération fournisseurs :", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/commandes-fournisseurs", form)
      .then(() => navigate("/dashboard/CommandesFournisseurs"))
      .catch(err => {
        console.error("Erreur lors de l'enregistrement :", err);
        alert("Erreur lors de l'enregistrement.");
      });
  };

  return (
    <div className="add-commande-container">
      <h2>Nouvelle commande fournisseur</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="produit">Produit</label>
          <input
            name="produit"
            id="produit"
            placeholder="Nom du produit"
            value={form.produit}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="quantite">Quantité</label>
          <input
            name="quantite"
            id="quantite"
            type="number"
            placeholder="Quantité"
            value={form.quantite}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="prix">Prix</label>
          <input
            name="prix"
            id="prix"
            type="number"
            step="0.01"
            placeholder="Prix"
            value={form.prix}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="id_fournisseur">Fournisseur</label>
          <select
            name="id_fournisseur"
            id="id_fournisseur"
            value={form.id_fournisseur}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir un fournisseur --</option>
            {fournisseurs.map(f => (
              <option key={f.id} value={f.id}>
                {f.nom} {f.prenom} ({f.email})
              </option>
            ))}
          </select>

          <button type="submit">Enregistrer la commande</button>
        </form>
      </div>
    </div>
  );
};

export default AddCommandeFournisseur;
