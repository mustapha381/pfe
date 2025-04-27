import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // simulate login success
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
      <p onClick={() => navigate("/register")} style={{ cursor: "pointer", marginTop: "10px" }}>
        Pas encore de compte ? Inscription
      </p>
    </div>
  );
}

export default Login;
