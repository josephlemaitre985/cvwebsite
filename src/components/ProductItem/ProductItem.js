import React, { useState, useContext } from 'react';
import { useCart } from '../../contexts/CartContext';
import { WishlistContext } from '../../contexts/WishlistContext';
import { RiShoppingCartLine, RiHeartLine, RiHeartFill } from 'react-icons/ri';
import './ProductItem.css';

function ProductItem({ product, isLastChance }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const handleAddToCartClick = () => {
    if (selectedSize) {
      addToCart({ ...product, selectedSize });
      setMessage('Votre article a bien été ajouté au panier.');
    } else {
      setMessage('Veuillez sélectionner votre taille avant d\'ajouter au panier.');
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      {isLastChance && product.originalPrice && (
        <p className="original-price">${product.originalPrice.toFixed(2)}</p>
      )}
      <p className={isLastChance ? "sale-price" : ""}>${product.price.toFixed(2)}</p>
      {isLastChance && (
        <p className="discount-percentage">-{product.discount}% off</p>
      )}
      <div className="product-footer">
        <div className="product-size">
          <select name="sizes" id={`size-select-${product.id}`} value={selectedSize} onChange={e => { setSelectedSize(e.target.value); setMessage(''); }}>
            <option value="">Sélectionnez votre taille</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className="add-to-cart" onClick={handleAddToCartClick}>
          <RiShoppingCartLine />
        </button>
        <button className="add-to-favorites" onClick={toggleFavorite}>
          {isFavorite ? <RiHeartFill /> : <RiHeartLine />}
        </button>
      </div>
      {message && <p className="product-message">{message}</p>}
    </div>
  );
}

export default ProductItem;
