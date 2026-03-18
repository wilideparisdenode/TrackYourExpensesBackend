require("dotenv").config();
const app=require("./app");
const connectDB = require("./utils/sequelize");
const port=process.env.PORT;

connectDB().then(() => {
  const server=app.listen(port,()=>{
      console.log(`Express is running on port ${server.address().port}`);
  });
});

   