const sequelize=require('../utils/sequelize.js');
const{DataTypes}=require('sequelize');

const expenses=sequelize.define("expenses",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,         references: {
          model: 'expense_categories',
          key: 'id'
        }
},
budget_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'budget',
        key: 'id'
      }
  }},{
    tableName:'expenses',
    timestamps:false,

})

module.exports=expenses;