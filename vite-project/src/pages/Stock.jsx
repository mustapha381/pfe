import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stock.css';

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        
        const [produitsRes, commandesClientsRes, commandesFournisseursRes] = await Promise.all([
          axios.get('http://localhost:3001/api/produits'),
          axios.get('http://localhost:3001/api/commandes-clients'),
          axios.get('http://localhost:3001/api/commandes-fournisseurs')
        ]);

        const stockMisAJour = produitsRes.data.map(produit => {
          const totalVentes = commandesClientsRes.data
            .filter(cmd => cmd.nom_produit === produit.name)
            .reduce((sum, cmd) => sum + Number(cmd.quantite), 0);

          const totalReceptions = commandesFournisseursRes.data
            .filter(cmd => cmd.nom_produit === produit.name)
            .reduce((sum, cmd) => sum + Number(cmd.quantite), 0);

          const stockActuel = produit.quantity + totalReceptions - totalVentes;

          return {
            ...produit,
            stockActuel,
            status: stockActuel <= 5 ? 'danger' : stockActuel <= 15 ? 'warning' : 'success'
          };
        });

        setStock(stockMisAJour);
        setError(null);
      } catch (err) {
        setError('Erreur de chargement des données');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 30000); // Rafraîchissement toutes les 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="stock-dashboard">
      <header className="dashboard-header">
        <h1>
          <span className="icon">📦</span>
          Gestion de Stock
        </h1>
        <p className="subtitle">Mise à jour automatique des quantités</p>
      </header>

      <div className="card">
        <div className="table-responsive">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th className="text-right">Stock</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {stock.map(produit => (
                <tr key={produit.id}>
                  <td className="product-cell">
                    <div className="product-name">{produit.name}</div>
                    <div className="product-description">{produit.description}</div>
                  </td>
                  <td>
                    <span className="category-tag">{produit.category}</span>
                  </td>
                  <td className="price">{parseFloat(produit.price).toFixed(2)} €</td>
                  <td className={`stock-value ${produit.status}`}>
                    {produit.stockActuel}
                  </td>
                  <td>
                    <div className={`status-indicator ${produit.status}`}>
                      {produit.status === 'danger' ? 'Stock bas' : 
                       produit.status === 'warning' ? 'Niveau moyen' : 'Disponible'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>Dernière mise à jour: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Stock;