const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', 'Chouchou12072019!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,  // Assurez-vous que ce port est correct

  logging: false, // Passer à true pour voir les logs des requêtes SQL
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(error => console.error('Impossible de se connecter à la base de données:', error));

  

module.exports = sequelize;
