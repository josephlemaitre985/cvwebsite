import React from 'react';
import ReactDOM from 'react-dom/client'; // Modifier l'importation pour inclure 'client'
import App from './App';
import { CartProvider } from './contexts/CartContext'; // Assurez-vous que le chemin est correct

const rootElement = document.getElementById('root'); // Obtenir l'élément racine
const root = ReactDOM.createRoot(rootElement); // Créer la racine avec la nouvelle API

root.render( // Utiliser la méthode render de la racine créée
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
