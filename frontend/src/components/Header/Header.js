// src/components/Header/Header.js
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ setSearchTerm, setSelectedGeneration, availableGenerations, toggleSidebar, toggleDarkMode }) => {
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
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-link">Cadastre-se</Link>
          <Link to="/favorites" className="auth-link">Meus Favoritos</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
