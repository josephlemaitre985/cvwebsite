import React from 'react';
import { useCart } from '../../contexts/CartContext'; // Ajustez le chemin selon la structure de votre projet
import { RiCloseCircleLine } from 'react-icons/ri'; // Importez l'icône de croix
import './Panier.css';
import { useNavigate } from 'react-router-dom';

function Panier() {
  const { cartItems, removeFromCart, updateCartItem } = useCart();

  const handleChange = (item, newQuantity, newSize) => {
    // Mettre à jour la taille et la quantité de l'article dans le panier
    updateCartItem(item.id, { quantity: newQuantity, size: newSize });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const navigate = useNavigate();

  return (
    <div className="panier-page">
      <h2>Votre Panier</h2>
      <div className="articles-liste">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="panier-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div>
                <h3>{item.title}</h3>
                <select value={item.size} onChange={(e) => handleChange(item, item.quantity, e.target.value)}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <input type="number" value={item.quantity} onChange={(e) => handleChange(item, e.target.value, item.size)} min="1" />
                <p>{item.price}€</p>
                <RiCloseCircleLine className="remove-item" onClick={() => removeFromCart(item.id)} title="Supprimer du panier" />
              </div>
            </div>
          ))
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
      <div className="total-panier">
        <p>Total : {totalPrice}€</p>
      </div>
      <button className="valider-panier" onClick={() => navigate('/checkout')}>Valider mon panier</button>
    </div>
  );
}

export default Panier;
