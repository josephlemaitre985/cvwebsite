import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem'; // Ajustez le chemin selon votre structure
import './Accessoires.css'; // Assurez-vous d'avoir un CSS pour styliser la page

// Simulons une récupération de données d'accessoires
const fauxAccessoires = [
  { id: 1, title: 'Montre élégante', price: 59.99, category: 'accessoires', image: 'url_de_l_image' },
  { id: 2, title: 'Ceinture en cuir', price: 34.99, category: 'accessoires', image: 'url_de_l_image' },
  // Ajoutez plus d'accessoires ici
];

function Accessoires() {
  const [accessoires, setAccessoires] = useState([]);

  useEffect(() => {
    // Simulez le chargement des données d'accessoires
    // Dans un vrai scénario, vous pourriez faire une requête à une API ici
    setAccessoires(fauxAccessoires);
  }, []);

  return (
    <div className="accessoires-page">
      <h1>Accessoires</h1>
      <div className="accessoires-list">
        {accessoires.map(accessoire => (
          <ProductItem key={accessoire.id} product={accessoire} />
        ))}
      </div>
    </div>
  );
}

export default Accessoires;
