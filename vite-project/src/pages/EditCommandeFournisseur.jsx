import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCommandeFournisseur = () => {
  const [form, setForm] = useState({ produit: "", quantite: "", prix: "", nom: "", prenom: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/commandes-fournisseurs")
      .then(res => {
        const cmd = res.data.find(c => c.id === parseInt(id));
        if (cmd) setForm(cmd);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/commandes-fournisseurs/${id}`, form)
      .then(() => navigate("/commandesFournisseurs"));
  };

  return (
    <div>
      <h2>Modifier commande</h2>
      <form onSubmit={handleSubmit}>
        <input name="produit" value={form.produit} onChange={handleChange} required />
        <input name="quantite" type="number" value={form.quantite} onChange={handleChange} required />
        <input name="prix" type="number" step="0.01" value={form.prix} onChange={handleChange} required />
        <input name="nom" value={form.nom} onChange={handleChange} required />
        <input name="prenom" value={form.prenom} onChange={handleChange} required />
        <input name="email" value={form.email} onChange={handleChange} required />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditCommandeFournisseur;