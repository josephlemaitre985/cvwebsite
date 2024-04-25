import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserLine, RiShoppingCartLine, RiHeartLine, RiMenu3Line } from 'react-icons/ri'; // Import des icônes nécessaires
import './Header.css';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/connexion');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fonction pour fermer le menu
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="header-logo">
                <img src="/logomandj.jpeg" alt="Logo MandJ" className="logo-image" />
                <Link to="/" className="header-btn" onClick={closeMenu}>MandJ</Link>
                <button className="menu-button" onClick={toggleMenu}><RiMenu3Line /></button>
            </div>
            <div className={`center-menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/last-chance" className="header-btn" onClick={closeMenu}>Last Chance</Link>
                <Link to="/new-in" className="header-btn" onClick={closeMenu}>New-in</Link>
                <Link to="/boutique" className="header-btn" onClick={closeMenu}>Prêt à porter</Link>
                <Link to="/accessoires" className="header-btn" onClick={closeMenu}>Accessoires</Link>
                <Link to="/seconde-main" className="header-btn" onClick={closeMenu}>Seconde main</Link>
            </div>
            <div className="header-icons">
                <div className="icon-container" onMouseEnter={() => setIsLoginOpen(true)} onMouseLeave={() => setIsLoginOpen(false)} onClick={handleLoginClick}>
                    <RiUserLine className="header-icon"/>
                    {isLoginOpen && (
                        <div className="login-system">
                            <p>Connectez-vous</p>
                            <input type="text" placeholder="Nom d'utilisateur" />
                            <input type="password" placeholder="Mot de passe" />
                            <button>Connexion</button>
                        </div>
                    )}
                </div>
                <div className="icon-container">
                    <Link to="/wishlist">
                        <RiHeartLine className="header-icon" />
                    </Link>
                    <Link to="/panier">
                        <RiShoppingCartLine className="header-icon"/>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;