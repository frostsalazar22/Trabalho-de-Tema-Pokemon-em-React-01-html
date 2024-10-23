import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ModeNightIcon from '@mui/icons-material/ModeNight'; // Importa o ícone de modo noturno
import { Link } from 'react-router-dom'; // Importa o Link do react-router-dom

const Header = ({ setSearchTerm, setSelectedGeneration, availableGenerations, toggleSidebar, toggleDarkMode }) => {
  return (
    <header>
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
            <li><a href="/">Início</a></li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Geração</a>
              <div className="dropdown-content">
                {availableGenerations.map(gen => (
                  <a
                    key={gen}
                    href="#"
                    onClick={() => setSelectedGeneration(gen)}
                  >
                    Geração {gen}
                  </a>
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
        <div className="auth-links"> {/* Adiciona um contêiner para os links de autenticação */}
          <Link to="/favorites" className="auth-link">Login</Link>
          <Link to="#" className="auth-link">Cadastre-se</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
