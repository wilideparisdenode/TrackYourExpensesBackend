const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize.js'); // Adjust the path to your Sequelize instance

const ExpenseCategory = sequelize.define('ExpenseCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    expense_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'expense_categories', // Optional: specify the table name
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = ExpenseCategory;