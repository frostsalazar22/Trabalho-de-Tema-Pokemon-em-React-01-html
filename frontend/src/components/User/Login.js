import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../services/firebase";
import './User.css';

const Login = () => {
  // Define e atualiza o estado do email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para realizar o login do usuário
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/favorites";
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
      <p className="forgot-password">
        New user? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
