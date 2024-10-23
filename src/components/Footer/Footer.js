import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../img/Logo.png'; // Certifique-se de ajustar o caminho conforme necessário

const Footer = () => {
  return (
    <footer>
      <div id="footer_content">
        <div id="footer_logo">
          <img src={Logo} alt="Logo" />
        </div>

        <ul className="footer-list">
          <li>
            <h3>Alunos</h3>
          </li>
          <li>
            <Link to="/" className="footer-link">Henrique</Link>
          </li>
          <li>
            <Link to="/" className="footer-link">Leonardo</Link>
          </li>
          <li>
            <Link to="/" className="footer-link">Robson</Link>
          </li>
          <li>
            <Link to="/" className="footer-link">Tales</Link>
          </li>
        </ul>

        <ul className="footer-list">
          <li>
            <h3>Contatos</h3>
          </li>
          <li>
            <Link to="/" className="footer-link">+55 00 90000-0000</Link>
          </li>
          <li>
            <Link to="/" className="footer-link">IrineuVcNaoSabeNemEu@Email.edu.br</Link>
          </li>
        </ul>
      </div>

      <div id="footer_copyright">
        &#169; 9000 all rights reserved
      </div>
    </footer>
  );
};

export default Footer;
