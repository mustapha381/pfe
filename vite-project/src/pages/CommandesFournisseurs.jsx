import React from "react";

const CommandesFournisseurs = () => {
  return (
    <div>
      <h2>Commandes aux Fournisseurs</h2>
      <button style={{ marginBottom: "10px" }}>Ajouter une commande fournisseur</button>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fournisseur</th>
            <th>Date</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>F001</td>
            <td>Youssef El</td>
            <td>2025-04-23</td>
            <td>3000 DH</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CommandesFournisseurs;
