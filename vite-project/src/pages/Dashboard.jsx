import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaWarehouse,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard">
      <header className="navbar">
        <nav className="navbar-section nav-menu">
          <button
            className={`nav-link ${isActive("/dashboard/home") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/home")}
          >
            <FaHome className="icon" /> Accueil
          </button>
          <button
            className={`nav-link ${isActive("/dashboard/products") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/products")}
          >
            <FaBoxOpen className="icon" /> Produits
          </button>
          <button
            className={`nav-link ${isActive("/dashboard/clients") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/clients")}
          >
            <FaUserCircle className="icon" /> Clients
          </button>
          <button
            className={`nav-link ${isActive("/dashboard/commandes") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/commandes")}
          >
            <FaUserCircle className="icon" /> Commandes Clients
          </button>
          <button
            className={`nav-link ${isActive("/dashboard/fournisseurs") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/fournisseurs")}
          >
            <FaUserCircle className="icon" /> Fournisseurs
          </button>
         <button
  className={`nav-link ${isActive("/dashboard/commandesFournisseurs") ? "active" : ""}`}
  onClick={() => navigate("/dashboard/commandesFournisseurs")}
>
  <FaUserCircle className="icon" /> Commandes Fournisseurs
</button>

         <button
  className={`nav-link ${isActive("/dashboard/stock") ? "active" : ""}`}
  onClick={() => navigate("/dashboard/stock")}
>
  <FaWarehouse className="icon" /> Stock
</button>

          <button
            className={`nav-link ${isActive("/dashboard/stats") ? "active" : ""}`}
            onClick={() => navigate("/dashboard/stats")}
          >
            <FaChartBar className="icon" /> Statistiques
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
