import React, { useState, useEffect } from 'react';
import './Connexion.css';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Vérifie si un utilisateur est déjà connecté au chargement du composant
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        if (parsedUser && parsedUser.username) {
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  // Gère la soumission des formulaires d'inscription et de connexion
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/users/${isSignUp ? 'register' : 'login'}`;

    try {
      const payload = isSignUp ? { username, email, password } : { email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/'); // Rediriger vers la page d'accueil après connexion
        setMessage(isSignUp ? 'Inscription réussie!' : 'Connexion réussie!');
      } else {
        throw new Error(data.message || "Unable to login/register");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  // Gère la déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMessage('Déconnexion réussie!');
  };

  return (
    <div className="connexion-page">
      <h2>{isSignUp ? 'Inscription' : 'Connexion / Création de compte'}</h2>
      {user ? <p>Connecté en tant que {user.username}</p> : null}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="form-group">
            <label>Nom d'utilisateur :</label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        )}
        {!user && (
          <>
            <div className="form-group">
              <label>Email :</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Mot de passe :</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">{isSignUp ? 'Inscrire' : 'Se connecter'}</button>
          </>
        )}
        {user && (
          <button type="button" onClick={handleLogout}>Se déconnecter</button>
        )}
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Avez-vous déjà un compte? Se connecter' : 'Créer un compte'}
        </button>
      </form>
    </div>
  );
}

export default Connexion;
