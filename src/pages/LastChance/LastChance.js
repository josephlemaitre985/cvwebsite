import React, { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './LastChance.css';

function LastChance() {
    const [sort, setSort] = useState('');
    const [discountFilter, setDiscountFilter] = useState('');

    return (
        <div className="last-chance-page">
            <h1>Offres Dernière Chance</h1>
            <p>Ces offres sont disponibles pour une durée limitée. Ne les manquez pas !</p>
            <div className="filters">
                <select onChange={(e) => setSort(e.target.value)}>
                    <option value="">Trier par prix</option>
                    <option value="priceAsc">Prix Croissant</option>
                    <option value="priceDesc">Prix Décroissant</option>
                </select>
                <select onChange={(e) => setDiscountFilter(e.target.value)}>
                    <option value="">Filtrer par remise</option>
                    <option value="10">Plus de 10%</option>
                    <option value="20">Plus de 20%</option>
                    <option value="30">Plus de 30%</option>
                    <option value="40">Plus de 40%</option>
                    <option value="50">Plus de 50%</option>
                    <option value="60">Plus de 60%</option>
                </select>
            </div>
            <ProductList isLastChance={true} sort={sort} discountFilter={discountFilter} />
        </div>
    );
}

export default LastChance;
