import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CommandesFournisseurs.css';

const CommandesFournisseurs = () => {
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/commandes-fournisseurs')
      .then(res => setCommandes(res.data));
  }, []);

  const supprimer = (id) => {
    axios.delete(`http://localhost:3001/api/commandes-fournisseurs/${id}`)
      .then(() => setCommandes(commandes.filter(c => c.id !== id)));
  };

  return (
    <div className="commandes-container">
      <div className="commandes-header">
        <h2>📦 Commandes Fournisseurs</h2>
        <Link to="/dashboard/commandesFournisseurs/add" className="btn-ajouter">➕ Ajouter une commande</Link>
      </div>

      <div className="table-wrapper">
        <table className="table-commandes">
          <thead>
            <tr>
              <th>Date</th>
              <th>Fournisseur</th>
              <th>tel</th>
              <th>Email</th>
              <th>Produits</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map(c => (
              <tr key={c.id}>
                <td>{new Date(c.date_commande).toLocaleString()}</td>
                <td>{c.nom}</td>
                <td>{c.tel}</td>
                <td>{c.email}</td>
                <td>{c.produits}</td>
                <td>{c.total} €</td>
                <td>{c.statut}</td>
                <td>
                  <button className="btn-modifier" onClick={() => navigate(`/dashboard/commandes-fournisseurs/edit/${c.id}`)}>✏️</button>
                  <button className="btn-supprimer" onClick={() => supprimer(c.id)}>🗑️</button>
                </td>
              </tr>
            ))}
            {commandes.length === 0 && (
              <tr><td colSpan="8" className="empty-row">Aucune commande fournisseur trouvée.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandesFournisseurs;