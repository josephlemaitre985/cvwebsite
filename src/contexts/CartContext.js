import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Fonction helper pour charger l'état initial du panier depuis localStorage
const loadInitialState = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadInitialState);

  // Sauvegarde les items du panier dans localStorage à chaque fois que cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find(item => item.id === product.id);
      if (isProductInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const updateCartItem = (productId, updates) => {
    setCartItems(prevItems => prevItems.map(item => {
      return item.id === productId ? { ...item, ...updates } : item;
    }));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};
