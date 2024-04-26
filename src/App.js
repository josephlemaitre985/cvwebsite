import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Boutique from './pages/Boutique/Boutique';
import Connexion from './pages/Connexion/Connexion';
import Panier from './pages/Panier/Panier';
import LastChance from './pages/LastChance/LastChance';
import NewIn from './pages/NewIn/NewIn';
import Accessoires from './pages/Accessoires/Accessoires';
import SecondeMain from './pages/SecondeMain/SecondeMain';
import Wishlist from './pages/Wishlist/Wishlist';
import Checkout from './pages/Checkout/Checkout';
import IntroPopup from './components/IntroPopup'; 

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('firstVisit') === null;
    if (isFirstVisit) {
      setShowPopup(true);
      localStorage.setItem('firstVisit', 'no');
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <WishlistProvider>
        <div className="App">
          {showPopup && <IntroPopup onClose={handleClosePopup} />}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/last-chance" element={<LastChance />} />
            <Route path="/new-in" element={<NewIn />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/accessoires" element={<Accessoires />} />
            <Route path="/seconde-main" element={<SecondeMain />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      </WishlistProvider>
    </Router>
  );
}

export default App;
