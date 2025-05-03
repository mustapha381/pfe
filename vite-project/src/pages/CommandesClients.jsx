import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CommandesClients.css';

const CommandesClients = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/commandes-clients')
      .then(res => setCommandes(res.data));
  }, []);

  const supprimer = (id) => {
    axios.delete(`http://localhost:3001/api/commandes-clients/${id}`)
      .then(() => setCommandes(commandes.filter(c => c.id !== id)));
  };

  return (
    <div className="commandes-container">
      <div className="commandes-header">
        <h2>📦 Commandes Clients</h2>
        <Link to="/dashboard/commandes/add" className="btn-ajouter">➕ Ajouter une commande</Link>
      </div>

      <div className="table-wrapper">
        <table className="table-commandes">
          <thead>
            <tr>
              <th>Date</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Âge</th>
              <th>Produits</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map(c => (
              <tr key={c.id}>
                <td>{new Date(c.date_commande).toLocaleString()}</td>
                <td>{c.nom}</td>
                <td>{c.prenom}</td>
                <td>{c.email}</td>
                <td>{c.age}</td>
                <td>{c.produits}</td>
                <td>{c.total} €</td>
                <td>{c.paiement}</td>
                <td>
                <button className="btn-modifier" onClick={() => navigate(`/dashboard/commandes-clients/edit/${c.id}`)}>✏️</button>
                  <button className="btn-supprimer" onClick={() => supprimer(c.id)}>🗑️</button>
                </td>
              </tr>
            ))}
            {commandes.length === 0 && (
              <tr><td colSpan="9" className="empty-row">Aucune commande trouvée.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandesClients;

