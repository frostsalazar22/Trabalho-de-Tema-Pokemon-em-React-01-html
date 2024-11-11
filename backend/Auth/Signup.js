// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../config/firebase';
import './Auth.css';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Usa auth diretamente
      await updateProfile(userCredential.user, { displayName: nickname });
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert('Falha no cadastro');
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Registrar</button>
    </div>
  );
};

export default Signup;
