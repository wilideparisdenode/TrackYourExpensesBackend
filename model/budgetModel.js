const sequelize=require("../utils/sequelize.js");
const {DataTypes} = require('sequelize');

const budget=sequelize.define("budget",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    income_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },  
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },  
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
   start_date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
    end_date:{
        type:DataTypes.DATE,
        defaultValue:null,
    },
  
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },

},{tableName:'budget',
    timestamps:false,}
)


module.exports=budget; 