import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        email,
        password,
      });

      console.log("✅ Utilisateur enregistré :", res.data);
      navigate("/"); // redirige vers login après succès
    } catch (err) {
      console.error("❌ Erreur d'inscription :", err.response?.data || err.message);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p onClick={() => navigate("/")} style={{ cursor: "pointer", marginTop: "10px" }}>
        Déjà inscrit ? Connexion
      </p>
    </div>
  );
}

export default Register;
