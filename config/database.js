const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
    // Configuration pour production sur Heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    });
} else {
    // Configuration pour développement local
    sequelize = new Sequelize(
      process.env.DB_NAME,     // Nom de la base de données
      process.env.DB_USER,     // Utilisateur de la base de données
      process.env.DB_PASS,     // Mot de passe de la base de données
      {
        host: process.env.DB_HOST, // Hôte de la base de données
        dialect: 'postgres',       // Type de base de données
        port: process.env.DB_PORT, // Port de la base de données
        logging: false             // Activez ou désactivez les logs SQL
      }
    );
}

// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(error => console.error('Impossible de se connecter à la base de données:', error));

module.exports = sequelize;
