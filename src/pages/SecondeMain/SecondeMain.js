import React, { useState } from 'react';
import SellForm from '../../components/SellForm/SellForm';
import ProductList from '../../components/ProductList/ProductList';
import './SecondeMain.css';

function SecondeMain() {
  const [view, setView] = useState('CHOICES');

  const handleSellClick = () => {
    setView('SELL_FORM');
  };

  const handleShopClick = () => {
    setView('SHOP');
  };

  return (
    <div className="seconde-main-page">
      <h1 className="page-title">Seconde Main</h1>
      <div className="intro-section">
        {view === 'CHOICES' && (
          <>
            <p>Bienvenue sur notre page dédiée aux articles de seconde main. Vous pouvez ici soit vendre vos articles, soit découvrir notre sélection d'articles remis en vente.</p>
            <div className="options">
              <button onClick={handleSellClick}>Vendre des articles</button>
              <button onClick={handleShopClick}>Voir nos articles de seconde main</button>
            </div>
          </>
        )}
        {view === 'SELL_FORM' && (
          <>
            <button onClick={() => setView('CHOICES')}>Retour</button>
            <SellForm />
          </>
        )}
        {view === 'SHOP' && (
          <>
            <button onClick={() => setView('CHOICES')}>Retour</button>
            <ProductList isLastChance={true} sort="priceDesc" category="" discountFilter="20" />
          </>
        )}
      </div>
    </div>
  );
}

export default SecondeMain;
