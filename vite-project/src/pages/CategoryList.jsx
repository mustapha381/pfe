import React, { useState, useEffect } from "react";
import "./CategoryList.css";

const CategoryList = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erreur fetch :", err));
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearch(cat.name);
  };

  return (
    <div className="modern-container">
      <h2 className="modern-title">🛍️ Explorez nos catégories</h2>

      {/* Recherche avec suggestions */}
      <div className="search-wrapper">
        <input
          type="text"
          className="modern-search"
          placeholder="Rechercher une catégorie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <div className="suggestions">
            {filteredCategories.map((cat) => (
              <div key={cat.id} onClick={() => handleCategoryClick(cat)} className="suggestion-item">
                {cat.name}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className="suggestion-item disabled">Aucune catégorie trouvée</div>
            )}
          </div>
        )}
      </div>

      {/* Produits */}
      {selectedCategory && (
        <div className="products-section">
          <h3>Produits dans <span className="highlight">{selectedCategory.name}</span> :</h3>
          <div className="product-grid">
            {selectedCategory.products.map((product) => (
              <div key={product.id} className="product-modern-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <span className="tag">{product.quality}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
