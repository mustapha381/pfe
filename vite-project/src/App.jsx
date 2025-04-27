import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Stats from "./pages/Stats";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CategoryList from "./pages/CategoryList";
import Clients from "./pages/Clients";
import CommandesClients from "./pages/CommandesClients";
import Fournisseurs from "./pages/Fournisseurs";
import CommandesFournisseurs from "./pages/CommandesFournisseurs";
import AddClient from "./pages/AddClient";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="stock" element={<Stock />} />
          <Route path="stats" element={<Stats />} />
          <Route path="clients" element={<Clients />} />
          <Route path="commandes-clients" element={<CommandesClients />} />
          <Route path="fournisseurs" element={<Fournisseurs />} />
          <Route path="commandes-fournisseur" element={<CommandesFournisseurs />} />
          <Route path="clients/add" element={<AddClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
