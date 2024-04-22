import React from 'react';
import { FaInstagram, FaFacebookSquare, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // Assurez-vous que le fichier CSS correspondant est mis à jour

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <p>Inscrivez-vous pour recevoir les dernières nouvelles !</p>
          <div className="input-group">
            <input type="email" placeholder="Votre adresse email" />
            <button type="button">S'inscrire</button>
          </div>
        </div>
        <div className="footer-section social-media">
          <h4>Suivez-nous</h4>
          <p>Suivez-nous sur les réseaux sociaux :</p>
          <div className="social-icons">
            <FaInstagram className="social-icon" />
            <FaFacebookSquare className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaLinkedin className="social-icon" />
          </div>
        </div>
        <div className="footer-section guarantees">
          <h4>Nos garanties</h4>
          <ul>
            <li>Livraison rapide</li>
            <li>Paiement sécurisé</li>
            <li>Satisfait ou remboursé</li>
            <li>Service client réactif</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
