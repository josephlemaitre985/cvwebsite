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

// Configuration CORS spécifique en fonction de l'environnement
const corsOptions = {
    origin: '*', // Attention: Utiliser '*' seulement pour le débogage
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
};

app.use(cors(corsOptions));
app.use(express.json());

// Log de débogage pour chaque requête
app.use((req, res, next) => {
    console.log(`Requête reçue avec méthode ${req.method} de ${req.origin} avec les en-têtes suivants: ${JSON.stringify(req.headers)}`);
    next();
});

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);

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
