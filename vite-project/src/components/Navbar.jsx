import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUserCircle, FaShoppingCart, FaWarehouse, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => (
  <header className="navbar">
    {/* Logo à gauche */}
    <div className="navbar-section logo">
      <h2>Mon Entreprise</h2>
    </div>

    {/* Menu centré */}
    <nav className="navbar-section nav-menu">
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaHome className="icon" /> Accueil
      </NavLink>
      <NavLink
        to="/dashboard/products"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaBoxOpen className="icon" /> Produits
      </NavLink>
      <NavLink
        to="/dashboard/clients"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaUserCircle className="icon" /> Clients
      </NavLink>
      <NavLink
        to="/dashboard/commandes-clients"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaShoppingCart className="icon" /> Commandes Clients
      </NavLink>
      <NavLink
        to="/dashboard/commandes-fournisseurs"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaShoppingCart className="icon" /> Commandes Fournisseurs
      </NavLink>
      <NavLink
        to="/dashboard/fournisseurs"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaUserCircle className="icon" /> Fournisseurs
      </NavLink>
      <NavLink
        to="/dashboard/stock"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaWarehouse className="icon" /> Stock
      </NavLink>
      <NavLink
        to="/dashboard/stats"
        className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
      >
        <FaChartBar className="icon" /> Statistiques
      </NavLink>
    </nav>

    {/* Profil à droite */}
    <div className="navbar-section user-info">
      <FaUserCircle className="user-icon" />
      <span className="username">Deconnexion</span>
      <FaSignOutAlt className="logout-icon" title="Déconnexion" />
    </div>
  </header>
);

export default Navbar;
