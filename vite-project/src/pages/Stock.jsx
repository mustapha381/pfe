import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stock.css";

const Stock = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/stock")
      .then(res => setProduits(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="stock-container">
      <h2>📦 Stock Actuel</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Quantité Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {produits.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nom}</td>
              <td>{p.quantite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
