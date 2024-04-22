import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../../images/imagehomepage.jpeg';
import promotionImage from '../../images/promotion.jpeg';
import product1 from '../../images/product1.jpeg';
import product2 from '../../images/product2.jpeg';
import product3 from '../../images/product3.jpeg';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setFeaturedProducts(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            <div className="promotion-banner" style={{ backgroundImage: `url(${promotionImage})` }}>
                <div className="banner-content">
                    <h2>Offre spéciale de la semaine</h2>
                    <p>Jusqu'à 50% de réduction sur une sélection de produits</p>
                    <Link to="/last-chance" className="cta-button">Voir les offres</Link>
                </div>
            </div>

            <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>Bienvenue sur MandJ</h1>
                <p>Découvrez nos dernières collections</p>
                <Link to="/boutique" className="cta-button">Découvrir la boutique</Link>
            </div>
            
            <div className="about-section">
                <h2>Qui sommes-nous ?</h2>
                <p>Nous sommes une entreprise passionnée par la mode, offrant une large gamme de produits de qualité.</p>
                <div className="testimonials">
                    <div className="testimonial">
                        <p>"J'ai été impressionné par la qualité des produits et le service client exceptionnel de MandJ."</p>
                        <p className="author">- Jeanne, cliente fidèle</p>
                    </div>
                    <div className="testimonial">
                        <p>"Les produits MandJ ont dépassé mes attentes. Je suis ravie de mon achat et je reviendrai sûrement!"</p>
                        <p className="author">- Pierre, nouveau client</p>
                    </div>
                </div>
            </div>
            
            <div className="featured-products-section">
                <h2>Produits phares</h2>
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.price} €</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="image-gallery">
                <h2>Nos nouveautés</h2>
                <div className="gallery-images">
                    <img src={product1} alt="Collection 1" />
                    <img src={product2} alt="Collection 2" />
                    <img src={product3} alt="Collection 3" />
                </div>
            </div>
        </div>
    );
}

export default Home;
