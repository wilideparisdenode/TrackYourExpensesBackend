const app=require("../app"); 
const express=require("express");
const userRouter=express.Router();
const {getAlluser,createNewuser,updateUser, deleteUser,login}=require("../controller/userController");
const userBudget = require("../controller/userActivityController");
const protect=require("../utils/authenticationMidleware");


userRouter.get("/user",getAlluser);
userRouter.post("/user",createNewuser);
userRouter.put("/user/:id",updateUser);
userRouter.put("/delete",deleteUser);

// userRouter.get("/budget",protect,userBudget)

userRouter.post("/login",login)


module.exports={userRouter};