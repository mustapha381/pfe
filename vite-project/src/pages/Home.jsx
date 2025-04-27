import React from 'react';
import './home.css';
import logo from '../assets/logo-en-ligne-de-boutique-125807920.webp'; // Ton logo

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src={logo} alt="Logo du magasin" className="logo" />
        <h1 className="shop-name">MagasinShop</h1>
        <p className="tagline">Produits de qualité pour tous les jours</p>
      </header>

      <section className="about">
        <h2>À propos de nous</h2>
        <p>
          Bienvenue dans notre petit magasin ! Nous vous proposons une gamme variée de produits soigneusement
          sélectionnés pour vous offrir le meilleur au quotidien. Qualité, accessibilité et proximité sont au cœur de notre mission.
        </p>
      </section>

      <section className="contact">
        <h2>Nos informations</h2>
        <ul>
          <li><strong>📍 Adresse :</strong> 123 Rue Tanger, El Jadida</li>
          <li><strong>📞 Téléphone :</strong> +212 6 00 00 00 00</li>
          <li><strong>✉️ Email :</strong> contact@lepetitmagasin.com</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
