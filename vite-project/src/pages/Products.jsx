// src/pages/Products.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3001/api/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h1>Dashboard Admin</h1>
      <div className="section">
        <div className="section-header">
          <h3>🗂️ Liste des Produits</h3>
          <button className="btn btn-green" onClick={() => navigate("/dashboard/products/add")}>
            Ajouter des produits
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>stock</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.quantity}</td>
                <td>{prod.price} €</td>
                <td>
                  <button className="btn btn-blue" onClick={() => navigate(`/dashboard/products/edit/${prod.id}`)}>Modifier</button>
                  <button className="btn btn-red" onClick={() => deleteProduct(prod.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-blue-outline" onClick={() => navigate("/dashboard/categories")}>
          Liste des catégories
        </button>
      </div>
    </div>
  );
}

export default Products;
