import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserLine, RiShoppingCartLine, RiHeartLine } from 'react-icons/ri';
import './Header.css';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate(); // Hook pour la navigation

    const handleLoginClick = () => {
        navigate('/connexion'); // Naviguer vers la page de connexion au clic
    };

    return (
        <header>
            <div className="header-logo">
                <img src="/logomandj.jpeg" alt="Logo MandJ" className="logo-image" /> {/* Utilisation du logo depuis le dossier public */}
                <Link to="/" className="header-btn">MandJ</Link>
            </div>
            <div className="center-menu">
                <Link to="/last-chance" className="header-btn">Last Chance</Link>
                <Link to="/new-in" className="header-btn">New-in</Link>
                <Link to="/boutique" className="header-btn">Prêt à porter</Link>
                <Link to="/accessoires" className="header-btn">Accessoires</Link>
                <Link to="/seconde-main" className="header-btn">Seconde main</Link>
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
