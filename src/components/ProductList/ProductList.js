import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

function ProductList({ isLastChance, sort, category, discountFilter }) {
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [sortState, setSortState] = useState(sort);
    const [categoryState, setCategoryState] = useState(category);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                let products = response.data;

                if (isLastChance) {
                    products = products.map(product => ({
                        ...product,
                        originalPrice: product.price,
                        price: parseFloat((product.price * (1 - Math.floor(Math.random() * 60 + 10) / 100)).toFixed(2)),
                        discount: Math.floor(Math.random() * 60 + 10)
                    }));
                }

                setAllProducts(products);
                setDisplayedProducts(products);
            })
            .catch(error => console.log(error));
    }, [isLastChance]);

    useEffect(() => {
        let filteredProducts = [...allProducts];

        if (discountFilter && isLastChance) {
            filteredProducts = filteredProducts.filter(product => product.discount >= parseInt(discountFilter));
        }

        if (categoryState) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryState);
        }

        if (sortState === 'priceAsc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortState === 'priceDesc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        setDisplayedProducts(filteredProducts);
    }, [sortState, categoryState, discountFilter, allProducts, isLastChance]);

    return (
        <div>
            {!isLastChance && (
                <div className="filters">
                    <select value={sortState} onChange={(e) => setSortState(e.target.value)}>
                        <option value="">Trier par</option>
                        <option value="priceAsc">Prix Croissant</option>
                        <option value="priceDesc">Prix Décroissant</option>
                    </select>
                    <select value={categoryState} onChange={(e) => setCategoryState(e.target.value)}>
                        <option value="">Toutes les catégories</option>
                        <option value="men's clothing">Vêtements Hommes</option>
                        <option value="women's clothing">Vêtements Femmes</option>
                    </select>
                </div>
            )}
            <div className="product-list">
                {displayedProducts.map(product => (
                    <ProductItem key={product.id} product={product} isLastChance={isLastChance} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
