// Charger les variables d'environnement en fonction de l'environnement
if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: './.env.production' });
} else {
    require('dotenv').config({ path: './.env.development' });
}

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', true);

// Configuration CORS pour tester avec des en-têtes explicites
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
            ? 'https://cv-web-site-client-1663cb36180a.herokuapp.com'
            : 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());

// Middleware pour ajouter des en-têtes CORS explicites
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Log de débogage pour chaque requête
app.use((req, res, next) => {
    console.log(`Requête reçue avec méthode ${req.method} à partir de ${req.originalUrl} avec les en-têtes suivants: ${JSON.stringify(req.headers)}`);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

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
