import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stock.css";

function Stock() {
  const [mouvements, setMouvements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    produit: "",
    type: "entrée",
    quantite: "",
  });

  // Charger les mouvements existants depuis l’API
  useEffect(() => {
    axios.get("http://localhost:3001/api/mouvements")
      .then((res) => setMouvements(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAjouter = () => {
    const nouveauMouvement = {
      ...formData,
      quantite: parseInt(formData.quantite),
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    // Ajouter à la base de données
    axios.post("http://localhost:3001/api/mouvements", nouveauMouvement)
      .then((res) => {
        setMouvements([res.data, ...mouvements]); // Ajouter dans le tableau local
        setShowForm(false);
        setFormData({ produit: "", type: "entrée", quantite: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="stock-container">
      <h3>📦 Mouvements de Stock</h3>

      {!showForm && (
        <>
          <table className="stock-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produit</th>
                <th>Type</th>
                <th>Quantité</th>
                <th>Date du mouvement</th>
              </tr>
            </thead>
            <tbody>
              {mouvements.map((mvt) => (
                <tr key={mvt.id}>
                  <td>{mvt.id}</td>
                  <td>{mvt.produit}</td>
                  <td>{mvt.type}</td>
                  <td>{mvt.quantite}</td>
                  <td>{mvt.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-container">
            <button className="btn-ajout" onClick={() => setShowForm(true)}>
              Ajouter un Mouvement de Stock
            </button>
          </div>
        </>
      )}

      {showForm && (
        <div className="form-container">
          <h4>Ajouter un Mouvement</h4>
          <label>Produit :</label>
          <input type="text" name="produit" value={formData.produit} onChange={handleChange} />

          <label>Type :</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="entrée">Entrée</option>
            <option value="sortie">Sortie</option>
          </select>

          <label>Quantité :</label>
          <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} />

          <div className="form-buttons">
            <button className="btn-ajout" onClick={handleAjouter}>Ajouter</button>
            <button className="btn-retour" onClick={() => setShowForm(false)}>Retour</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stock;
