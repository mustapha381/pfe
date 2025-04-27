import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./stats.css";

function Stats() {
  const [totalEntrees, setTotalEntrees] = useState(0);
  const [totalSorties, setTotalSorties] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/api/mouvements")
      .then((res) => {
        const mouvements = res.data;

        let entrees = 0;
        let sorties = 0;

        mouvements.forEach((mvt) => {
          if (mvt.type === "entrée") {
            entrees += mvt.quantite;
          } else if (mvt.type === "sortie") {
            sorties += mvt.quantite;
          }
        });

        setTotalEntrees(entrees);
        setTotalSorties(sorties);
      })
      .catch((err) => console.error(err));
  }, []);

  const data = [
    {
      name: "Produits",
      Achetes: totalEntrees,
      Vendu: totalSorties,
      Stock: totalEntrees - totalSorties,
    },
  ];

  return (
    <div className="page-container">
      <h2>📊 Statistiques de Stock</h2>
      <p>Vue d'ensemble des entrées, sorties et du stock actuel.</p>

      <div className="stats-cards">
        <div className="card card-green">
          <h4>Produits achetés</h4>
          <p>{totalEntrees}</p>
        </div>
        <div className="card card-red">
          <h4>Produits vendus</h4>
          <p>{totalSorties}</p>
        </div>
        <div className="card card-blue">
          <h4>Produits en stock</h4>
          <p>{totalEntrees - totalSorties}</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Achetes" fill="#4CAF50" />
            <Bar dataKey="Vendu" fill="#F44336" />
            <Bar dataKey="Stock" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Stats;