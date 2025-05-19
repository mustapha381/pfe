import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddCommande.css';

const AddCommande = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({ client_id: "", paiement: "payée" });

  // Quantités saisies pour chaque produit
  const [quantites, setQuantites] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/clients").then(res => setClients(res.data));
    axios.get("http://localhost:3001/api/products").then(res => setProduits(res.data));
  }, []);

  const handleQuantiteChange = (id, value) => {
    setQuantites({ ...quantites, [id]: value });
  };

  const addToPanier = (produit) => {
    const quantityToAdd = parseInt(quantites[produit.id]);
    if (!quantityToAdd || quantityToAdd < 1) {
      alert("Veuillez saisir une quantité valide !");
      return;
    }

    const exist = panier.find(item => item.id === produit.id);
    if (exist) {
      setPanier(panier.map(item =>
        item.id === produit.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
      ));
    } else {
      setPanier([...panier, { ...produit, quantity: quantityToAdd }]);
    }

    // Réinitialiser la quantité
    setQuantites({ ...quantites, [produit.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produits = panier.map(item => ({
      produit_id: item.id,
      quantity: item.quantity
    }));

    const dataToSubmit = {
      client_id: formData.client_id,
      produits,
      paiement: formData.paiement
    };

    try {
      const res = await axios.post("http://localhost:3001/api/commandes-clients", dataToSubmit);
      if (res.status === 201) {
        alert("✅ Commande enregistrée !");
        navigate("/dashboard/commandes");
      }
    } catch (err) {
      console.error("❌ Erreur :", err.response?.data || err.message);
    }
  };

  return (
    <div className="add-commande-container">
      <h2>➕ Ajouter une Commande</h2>
      <form className="commande-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>👤 Client :</label>
          <select
            value={formData.client_id}
            onChange={e => setFormData({ ...formData, client_id: e.target.value })}
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.nom} {c.prenom}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📦 Produits disponibles :</label>
          <div className="produits-grid">
            {produits.map(p => (
              <div key={p.id} className="produit-card">
                <p><strong>{p.name}</strong></p>
                <p>{p.price} €</p>
                <input
                  type="number"
                  min="1"
                  value={quantites[p.id] || ""}
                  onChange={(e) => handleQuantiteChange(p.id, e.target.value)}
                  className="input-quantite"
                  placeholder="Quantité"
                />
                <button type="button" onClick={() => addToPanier(p)}>➕ Ajouter</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>🛒 Panier :</label>
          <ul className="panier-list">
            {panier.map(item => (
              <li key={item.id}>
                {item.name} — {item.quantity} x {item.price} € = <strong>{item.quantity * item.price} €</strong>
              </li>
            ))}
            {panier.length === 0 && <li className="empty">Aucun produit dans le panier</li>}
          </ul>
        </div>

        <div className="form-group">
          <label>💳 Paiement :</label>
          <select
            value={formData.paiement}
            onChange={e => setFormData({ ...formData, paiement: e.target.value })}
          >
            <option value="payée">Payée</option>
            <option value="moitié payée">Moitié payée</option>
            <option value="non payée">Non payée</option>
          </select>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-valider">✅ Valider la commande</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommande;
