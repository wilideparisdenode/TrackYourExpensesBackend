const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const income=sequelize.define("income",{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    amount:{type:DataTypes.FLOAT,
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
    source:{
        type:DataTypes.STRING,
        allowNull:true,
    },
},{
    tableName:'income',
    timestamps:false,

})

module.exports=income;