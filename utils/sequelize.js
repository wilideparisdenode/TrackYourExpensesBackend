const sequelize=require("sequelize");

const db=new sequelize.Sequelize(process.env.pgDatabase,process.env.pgUser,process.env.pgPassword,{
    host:process.env.pgHost,
    dialect:"postgres"
});


try{
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
}
catch(err){

}
module.exports=db;