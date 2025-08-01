const app=require("../app"); 
const express=require("express");
const userRouter=express.Router();
const {getAlluser,createNewuser,updateUser, deleteUser,login}=require("../controller/userController");
const userBudget = require("../controller/userActivityController");
const {protect,isAdmin}=require("../utils/authenticationMidleware");


userRouter.get("/user",protect,isAdmin,getAlluser);
userRouter.post("/user",createNewuser);
userRouter.put("/user/:id",protect,updateUser);
userRouter.put("/delete",protect,isAdmin,deleteUser);

// userRouter.get("/budget",protect,userBudget)

userRouter.post("/login",login)


module.exports={userRouter};