import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./clients.css";

function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des clients", err);
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/clients/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Erreur lors de la suppression du client", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="client-page">
      <h1 className="client-title">👥 Gestion des Clients</h1>
      <div className="client-section">
        <div className="client-section-header">
          <h3>Liste des Clients</h3>
          <button className="client-btn add" onClick={() => navigate("/dashboard/clients/add")}>
            ➕ Ajouter un client
          </button>
        </div>

        <table className="client-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Âge</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.age}</td>
                <td>{client.email}</td>
                <td>
                  <button className="client-btn edit" onClick={() => navigate(`/dashboard/clients/edit/${client.id}`)}>
                    ✏️ Modifier
                  </button>
                  <button className="client-btn delete" onClick={() => deleteClient(client.id)}>
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

export default Clients;
