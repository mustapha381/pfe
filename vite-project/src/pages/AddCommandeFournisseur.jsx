import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddCommandeFournisseur.css';

const AddCommandeFournisseur = () => {
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({ fournisseur_id: "", statut: "en attente" });

  // Nouveau state pour stocker les quantités saisies pour chaque produit
  const [quantites, setQuantites] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/fournisseurs").then(res => setFournisseurs(res.data));
    axios.get("http://localhost:3001/api/produits").then(res => setProduits(res.data));
  }, []);

  const addToPanier = (produit) => {
    const qty = parseInt(quantites[produit.id]) || 0;
    if (qty <= 0) {
      alert("Veuillez saisir une quantité valide (> 0) avant d'ajouter.");
      return;
    }

    const exist = panier.find(item => item.id === produit.id);
    if (exist) {
      setPanier(panier.map(item =>
        item.id === produit.id ? { ...item, quantity: item.quantity + qty } : item
      ));
    } else {
      setPanier([...panier, { ...produit, quantity: qty }]);
    }

    // Réinitialiser la quantité saisie pour ce produit
    setQuantites(prev => ({ ...prev, [produit.id]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produitsToSend = panier.map(item => ({
      produit_id: item.id,
      quantity: item.quantity,
      prix_achat: item.prix_achat || item.price
    }));

    const dataToSubmit = {
      fournisseur_id: formData.fournisseur_id,
      produits: produitsToSend,
      statut: formData.statut
    };

    try {
      const res = await axios.post("http://localhost:3001/api/commandes-fournisseurs", dataToSubmit);
      if (res.status === 201) {
        alert("✅ Commande fournisseur enregistrée !");
        navigate("/dashboard/commandesFournisseurs");
      }
    } catch (err) {
      console.error("❌ Erreur :", err.response?.data || err.message);
    }
  };

  return (
    <div className="add-commande-container">
      <h2>➕ Ajouter une Commande Fournisseur</h2>
      <form className="commande-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>🏭 Fournisseur :</label>
          <select 
            value={formData.fournisseur_id} 
            onChange={e => setFormData({ ...formData, fournisseur_id: e.target.value })} 
            required
          >
            <option value="">Sélectionner un fournisseur</option>
            {fournisseurs.map(f => (
              <option key={f.id} value={f.id}>{f.nom}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📦 Produits disponibles :</label>
          <div className="produits-grid">
            {produits.map(p => (
              <div key={p.id} className="produit-card">
                <p><strong>{p.name}</strong></p>
                <p>Prix: {p.price} €</p>

                <div className="prix-achat-input">
                  <label>Prix d'achat:</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={panier.find(item => item.id === p.id)?.prix_achat || ""}
                    onChange={(e) => {
                      const newPrix = parseFloat(e.target.value);
                      setPanier(prevPanier => prevPanier.map(item => 
                        item.id === p.id ? {...item, prix_achat: newPrix} : item
                      ));
                    }}
                  />
                </div>

                <div className="quantite-input">
                  <label>Quantité :</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantites[p.id] || ""} 
                    onChange={e => setQuantites(prev => ({ ...prev, [p.id]: e.target.value }))} 
                  />
                </div>

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
              {item.name} — {item.quantity} x {item.prix_achat || item.price} € = <strong>{item.quantity * (item.prix_achat || item.price)} €</strong>

              </li>
            ))}
            {panier.length === 0 && <li className="empty">Aucun produit dans le panier</li>}
          </ul>
        </div>

        <div className="form-group">
          <label>📊 Statut :</label>
          <select 
            value={formData.statut} 
            onChange={e => setFormData({ ...formData, statut: e.target.value })}
          >
            <option value="en attente">En attente</option>
            <option value="livrée">Livrée</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-valider">✅ Valider la commande</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommandeFournisseur;
