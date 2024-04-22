import React, { createContext, useState, useContext } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (item) => {
        setWishlistItems((prevItems) => [...prevItems, item]);
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
