const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,  // Validation pour s'assurer que l'email est dans un format valide
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,  // Sequelize gère `created_at` et `updated_at`
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users'  // Assurez-vous que le nom de la table correspond exactement à ce que vous avez dans PostgreSQL
});

module.exports = User;
