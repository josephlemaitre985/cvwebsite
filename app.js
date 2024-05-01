// Charger les variables d'environnement en fonction de l'environnement
if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: './.env.production' });
} else {
    require('dotenv').config({ path: './.env.development' });
}

// Logs pour débogage
console.log('Environment:', process.env.NODE_ENV);
console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);
console.log('Database Name:', process.env.DB_NAME);
console.log('API URL:', process.env.REACT_APP_API_URL);

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const stripeRoutes = require('./routes/stripeRoutes'); // Importation des routes Stripe
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', true);

// Configuration CORS spécifique en fonction de l'environnement
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
            ? 'https://cv-web-site-client-1663cb36180a.herokuapp.com'  // URL de production de votre front-end
            : 'http://localhost:3000',  // URL de développement local de votre front-end
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes); // Utilisation des routes Stripe

// Tester la connexion à la base de données avant de démarrer le serveur
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

module.exports = app;