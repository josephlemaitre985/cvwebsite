import React, { useContext } from 'react';
import { RiShoppingCart2Line, RiHeart3Line } from 'react-icons/ri';
import { WishlistContext } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext'; // Assurez-vous que ce hook est bien défini
import './Wishlist.css'; // Assurez-vous d'inclure votre fichier CSS

function WishlistItem({ item, onRemove, onMoveToCart }) {
  return (
    <div className="wishlist-item">
      <div className="wishlist-item-image-container">
        <img src={item.image} alt={item.name} className="wishlist-item-image" />
      </div>
      <div className="wishlist-item-info">
        <h3 className="wishlist-item-title">{item.name}</h3>
        <p className="wishlist-item-price">{item.price} €</p>
        <div className="wishlist-item-details">
          <div className="wishlist-item-detail">
            Taille: 
            <select defaultValue={item.size}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="wishlist-item-detail">
            Quantité: 
            <input type="number" defaultValue={item.quantity} min="1" />
          </div>
        </div>
        <div className="wishlist-item-actions">
          <button className="wishlist-action-button" onClick={() => onMoveToCart(item)}>
            <RiShoppingCart2Line /> Ajouter au panier
          </button>
          <button className="wishlist-action-button" onClick={() => onRemove(item.id)}>
            <RiHeart3Line /> Retirer
          </button>
        </div>
      </div>
    </div>
  );
}

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useCart(); // Utilisez useCart ici pour accéder à addToCart

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleMoveToCart = (item) => {
    addToCart(item); // Utilisez la fonction addToCart de useCart
    removeFromWishlist(item.id);
  };

  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={handleRemoveFromWishlist}
            onMoveToCart={handleMoveToCart}
          />
        ))
      ) : (
        <p>Votre wishlist est vide.</p>
      )}
    </div>
  );
}

export default Wishlist;
