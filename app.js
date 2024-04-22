const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Changez le port ici

app.use(cors()); // Applique CORS pour toutes les requêtes

// Middleware pour s'assurer que le JSON est correctement interprété et que le Content-Type est correct
app.use(express.json()); // Pour parser le JSON entrant
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json'); // Assurez-vous que chaque réponse est de type application/json
    next();
});

// Ajoutez cette route pour gérer les requêtes GET à la racine
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' }); // Retourne du JSON au lieu de texte brut
});

app.use('/api/users', userRoutes); // Chemin de base pour les routes utilisateur

// Connexion à la base de données et démarrage du serveur
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
