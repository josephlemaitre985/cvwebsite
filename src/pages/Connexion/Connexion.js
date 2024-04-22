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

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        if (parsedUser && parsedUser.username) {  // Assurez-vous que l'objet utilisateur est valide
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user');  // Enlève les données corrompues pour éviter des erreurs récurrentes
        setUser(null);  // Réinitialise l'état de l'utilisateur
      }
    }
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5000/api/users/${isSignUp ? 'register' : 'login'}`;
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
        if (!isSignUp || (isSignUp && !data.user)) {
          // Gère l'inscription sans connexion automatique
          setMessage(data.message + ' Please log in.'); // Invite à se connecter après l'inscription
          if (!isSignUp && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setMessage('Connexion réussie!');
            navigate('/');
          }
        } else {
          throw new Error("Missing user data in response");
        }
      } else {
        throw new Error(data.message || "Unable to login/register");
      }
      
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

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
