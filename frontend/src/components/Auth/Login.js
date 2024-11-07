// src/components/Auth/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseService from '../../services/FirebaseService';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Importação do CSS para estilos de login e cadastro

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = firebaseService.getAuthInstance();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/favorites'); // Redireciona para a página de favoritos
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert('Login falhou!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
