import { NavLink } from "react-router-dom";
import { FaUsers, FaClipboardList, FaTruck, FaFileAlt } from "react-icons/fa";
import "./SideMenu.css";

const SideMenu = () => {
  return (
    <aside className="side-menu">
      <div className="side-menu-header">
        <h3>Gestion</h3>
      </div>
      
      <NavLink
        to="/dashboard/clients"
        className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
      >
        <FaUsers className="icon" /> Clients
      </NavLink>
      <NavLink
        to="/dashboard/commandes-client"
        className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
      >
        <FaClipboardList className="icon" /> Commandes Clients
      </NavLink>
      <NavLink
        to="/dashboard/fournisseurs"
        className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
      >
        <FaTruck className="icon" /> Fournisseurs
      </NavLink>
      <NavLink
        to="/dashboard/commandes-fournisseur"
        className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
      >
        <FaFileAlt className="icon" /> Commandes Fournisseurs
      </NavLink>
    </aside>
  );
};

export default SideMenu;
