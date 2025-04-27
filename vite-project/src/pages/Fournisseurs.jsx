import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./fournisseurs.css";

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const navigate = useNavigate();

  const fetchFournisseurs = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/fournisseurs");
      setFournisseurs(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des fournisseurs", err);
    }
  };

  const deleteFournisseur = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/fournisseurs/${id}`);
      fetchFournisseurs();
    } catch (err) {
      console.error("Erreur lors de la suppression du fournisseur", err);
    }
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  return (
    <div className="fournisseur-page">
      <h1 className="fournisseur-title">🏢 Gestion des Fournisseurs</h1>
      <div className="fournisseur-section">
        <div className="fournisseur-section-header">
          <h3>Liste des Fournisseurs</h3>
          <button className="fournisseur-btn add" onClick={() => navigate("/dashboard/fournisseurs/add")}>
            ➕ Ajouter un fournisseur
          </button>
        </div>

        <table className="fournisseur-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Spécialité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fournisseurs.map((fournisseur) => (
              <tr key={fournisseur.id}>
                <td>{fournisseur.id}</td>
                <td>{fournisseur.nom}</td>
                <td>{fournisseur.adresse}</td>
                <td>{fournisseur.email}</td>
                <td>{fournisseur.telephone}</td>
                <td>{fournisseur.specialite}</td>
                <td>
                  <button className="fournisseur-btn edit" onClick={() => navigate(`/dashboard/fournisseurs/edit/${fournisseur.id}`)}>
                    ✏️ Modifier
                  </button>
                  <button className="fournisseur-btn delete" onClick={() => deleteFournisseur(fournisseur.id)}>
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fournisseurs;

