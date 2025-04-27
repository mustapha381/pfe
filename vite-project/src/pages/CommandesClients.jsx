import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CommandesClients() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/clients').then(res => setClients(res.data));
    axios.get('http://localhost:3001/api/products').then(res => setProducts(res.data));
  }, []);

  const addProduct = (productId) => {
    if (!selectedProducts.find(p => p.produit_id === productId)) {
      setSelectedProducts([...selectedProducts, { produit_id: productId, quantite: 1 }]);
    }
  };

  const updateQuantity = (index, value) => {
    const updated = [...selectedProducts];
    updated[index].quantite = value;
    setSelectedProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || selectedProducts.length === 0) {
      alert("Client ou produits manquants !");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/commandes', {
        client_id: selectedClient,
        produits: selectedProducts,
        statut_paiement: 'non payé'
      });
      alert("✅ Commande créée !");
      navigate('/dashboard/commandes-clients');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erreur création commande.");
    }
  };

  return (
    <div className="page-container">
      <h2>🛒 Créer une Commande Client</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client :</label>
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
            <option value="">-- Sélectionner un client --</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.nom} {client.prenom}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <h3>Ajouter des Produits :</h3>
          {products.map(prod => (
            <div key={prod.id} className="product-item">
              {prod.name} (Stock: {prod.quantity})
              <button type="button" onClick={() => addProduct(prod.id)}>Ajouter</button>
            </div>
          ))}
        </div>

        <div className="form-group">
          <h3>Panier :</h3>
          {selectedProducts.map((item, index) => {
            const prod = products.find(p => p.id === item.produit_id);
            return (
              <div key={index}>
                {prod.name}
                <input type="number"
                  value={item.quantite}
                  min="1"
                  max={prod.quantity}
                  onChange={(e) => updateQuantity(index, Number(e.target.value))}
                />
              </div>
            );
          })}
        </div>

        <button className="btn btn-green" type="submit">Valider la Commande</button>
      </form>
    </div>
  );
}

export default CommandesClients;
