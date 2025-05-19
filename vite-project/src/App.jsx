import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";


import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CategoryList from "./pages/CategoryList";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import CommandesClients from "./pages/CommandesClients";
import AddCommande from "./pages/AddCommande";
import Fournisseurs from "./pages/Fournisseurs";
import AddFournisseur from "./pages/AddFournisseur"; // ✅ import ajouté
import CommandesFournisseurs from "./pages/CommandesFournisseurs";
import AddCommandeFournisseur from "./pages/AddCommandeFournisseur";
import EditCommandeFournisseur from "./pages/EditCommandeFournisseur";
import Stock from "./pages/Stock"; 


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
          
          
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="commandes" element={<CommandesClients />} />
          <Route path="commandes/add" element={<AddCommande />} />
          <Route path="fournisseurs" element={<Fournisseurs />} />
          <Route path="fournisseurs/add" element={<AddFournisseur />} /> 
           <Route path="commandesFournisseurs" element={<CommandesFournisseurs />} />
          <Route path="commandesFournisseurs/add" element={<AddCommandeFournisseur />} />
          <Route path="commandesFournisseurs/edit/:id" element={<EditCommandeFournisseur />} />
          <Route path="stock" element={<Stock />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
