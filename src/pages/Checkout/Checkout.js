// src/pages/Checkout/Checkout.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems,  } = useCart();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de traitement du paiement
    alert('Paiement effectué avec succès!');
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Résumé de la commande</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="checkout-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>Taille: {item.selectedSize}</p>
              <p>Quantité: {item.quantity}</p>
              <p>Prix: {item.price}€</p>
            </div>
          </div>
        ))}
        <p className="checkout-total">Total: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <h3>Informations de paiement</h3>
        {/* Formulaire de saisie des informations de paiement */}
        {/* ... */}
        <button type="submit">Payer maintenant</button>
      </form>
    </div>
  );
}

export default Checkout;
