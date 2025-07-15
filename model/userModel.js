// filepath: /home/wilson/Desktop/wilson/expence_Tracker/server/model/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'user',
    timestamps: false,
});

module.exports = User;