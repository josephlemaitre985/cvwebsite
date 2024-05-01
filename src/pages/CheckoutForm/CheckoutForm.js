import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    // Définir l'URL de base de l'API en fonction de l'environnement
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Charger le client_secret lorsque le composant est monté
    useEffect(() => {
        fetch(`${API_BASE_URL}/stripe/payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }) // Remplacez 1000 par votre logique de calcul du montant
        })
        .then(res => res.json())
        .then(data => {
            setClientSecret(data.clientSecret);
        })
        .catch(error => console.error('Error fetching client secret:', error));
    }, [API_BASE_URL]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log('Stripe.js has not yet loaded.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        });

        if (error) {
            console.log('Erreur de paiement:', error.message);
        } else {
            console.log('Paiement réussi:', paymentIntent.id);
        }
    };

    return (
        <div className="checkout-container">
            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="card-element">Credit or debit card</label>
                    <CardElement className="card-element"/>
                </div>
                <button className="submit-button" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;