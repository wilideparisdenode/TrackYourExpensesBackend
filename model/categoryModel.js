const sequelize=require("../utils/sequelize.js");
const { DataTypes}=require("sequelize");
const Expense=require('./expenseModel.js');
 
const category=sequelize.define("category",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
       
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
    
},{
    tableName:"categories",
    timestamps:true
})
category.hasMany(Expense, { foreignKey: 'category_id' });

module.exports=category;