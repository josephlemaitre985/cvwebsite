import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem'; // Ajustez le chemin selon la structure de votre projet

// Simulons une récupération de données pour les nouveautés
const fauxNouveautes = [
  { id: 1, title: 'Sac à dos moderne', price: 49.99, category: 'nouveautés', image: 'url_de_l_image' },
  { id: 2, title: 'Lunettes de soleil', price: 24.99, category: 'nouveautés', image: 'url_de_l_image' },
  // Ajoutez plus de nouveautés ici
];

function NewIn() {
  const [nouveautes, setNouveautes] = useState([]);

  useEffect(() => {
    // Dans un vrai scénario, vous feriez une requête à une API ici
    setNouveautes(fauxNouveautes);
  }, []);

  return (
    <div>
      <h1>New-In</h1>
      <p>Découvrez nos dernières nouveautés.</p>
      <div className="product-list">
        {nouveautes.map(nouveaute => (
          <ProductItem key={nouveaute.id} product={nouveaute} />
        ))}
      </div>
    </div>
  );
}

export default NewIn;
