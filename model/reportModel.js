const sequelize=require("../utils/sequelize.js");
const {DataTypes}=require("sequelize");

const Reports=sequelize.define("reports",{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    total_income:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    total_expenses:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
   balance:{
    type:DataTypes.FLOAT,
    allowNull:false
   }
},{
    tableName:"report",
    timestamps:false
})

module.exports=Reports;