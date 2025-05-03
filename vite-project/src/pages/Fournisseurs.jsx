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
            ➕ Ajouter
          </button>
        </div>

        <div className="table-wrapper">
          <table className="fournisseur-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
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
                  <td>{fournisseur.prenom}</td>
                  <td>{fournisseur.email}</td>
                  <td>{fournisseur.tel}</td>
                  <td>{fournisseur.specialite}</td>
                  <td>
                    <button className="fournisseur-btn edit" onClick={() => navigate(`/dashboard/fournisseurs/edit/${fournisseur.id}`)}>
                      ✏️
                    </button>
                    <button className="fournisseur-btn delete" onClick={() => deleteFournisseur(fournisseur.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {fournisseurs.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-data">Aucun fournisseur trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Fournisseurs;
