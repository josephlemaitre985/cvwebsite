const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Créer une intention de paiement
router.post('/payment-intent', async (req, res) => {
    const { amount } = req.body; // Assurez-vous que le montant est en centimes et est un nombre entier
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Erreur lors de la création de l\'intention de paiement:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
