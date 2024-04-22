import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Boutique.css';


function Boutique() {
  return (
    <div className="boutique-page">
      <h2>Découvrez nos produits</h2>
      <ProductList isLastChance={false} />
    </div>
  );
}

export default Boutique;
