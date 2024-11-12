import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../services/firebase";
import './Header.css';

const Header = ({ setSearchTerm, setSelectedGeneration, availableGenerations, toggleSidebar, toggleDarkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Observa as mudanças no estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Função para deslogar o usuário
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header className="header">
      <div className="search-container">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Qual o Nome do Poke"
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="button" className="search-button">Buscar</button>
          </div>
        </form>
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li className="dropdown">
              <Link to="#" className="dropbtn">Geração</Link>
              <div className="dropdown-content">
                {availableGenerations.map(gen => (
                  <Link
                    key={gen}
                    to="#"
                    onClick={() => setSelectedGeneration(gen)}
                  >
                    Geração {gen}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="dark-mode"
          onClick={toggleDarkMode}
        >
          <ModeNightIcon />
        </IconButton>

        <div className="auth-links">
          {user ? (
            // Se o usuário está logado
            <>
              <Link to="/favorites" className="auth-link">Meus Favoritos</Link>
              <button onClick={handleLogout} className="auth-link">Logout</button>
            </>
          ) : (
            // Se o usuário não está logado
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Cadastre-se</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
