import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CommandesFournisseurs.css";

const CommandesFournisseurs = () => {
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = () => {
    axios.get("http://localhost:3001/api/commandes-fournisseurs")
      .then(res => setCommandes(res.data));
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      axios.delete(`http://localhost:3001/api/commandes-fournisseurs/${id}`)
        .then(() => fetchCommandes());
    }
  };

  return (
    <div className="commandes-container">
      <div className="commandes-header">
        <h2>📦 Commandes Fournisseurs</h2>
        <button className="add-button" onClick={() => navigate("/dashboard/commandesFournisseurs/add")}>
          ➕ Ajouter une commande
        </button>
      </div>

      <table className="commandes-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Fournisseur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map(c => (
            <tr key={c.id}>
              <td>{new Date(c.date_commande).toLocaleString()}</td>
              <td>{c.produit}</td>
              <td>{c.quantite}</td>
              <td>{parseFloat(c.prix).toFixed(2)} €</td>
              <td>{c.nom_fournisseur} {c.prenom_fournisseur}</td>
              <td>{c.email_fournisseur}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit" onClick={() => navigate(`/editcommandeFournisseur/${c.id}`)}>✏️</button>
                  <button className="delete" onClick={() => handleDelete(c.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandesFournisseurs;
