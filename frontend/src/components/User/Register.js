import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import './User.css';

const Register = () => {
  // Define e atualiza o estado do email, senha, primeiro nome e sobrenome
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // Função para realizar o registro do usuário
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          favorites: []
        });
      }

      toast.success("Usuário registrado com sucesso!", { position: "top-center" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao registrar:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
        
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
        
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
      <p className="forgot-password">
        Already registered? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
