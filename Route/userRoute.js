const app=require("../app"); 
const express=require("express");
const userRouter=express.Router();
const {getAlluser,createNewuser,updateUser, deleteUser,login, changePassword,updatePersonalInfo}=require("../controller/userController");
const {protect,isAdmin}=require("../utils/authenticationMidleware");
const upload=require("../utils/multerconfig")

userRouter.get("/user",protect,isAdmin,getAlluser);
userRouter.post("/user",createNewuser);
userRouter.put("/user/:id",protect,updateUser);
userRouter.put("/delete",protect,isAdmin,deleteUser);
userRouter.put("/edit-pass",protect, changePassword);
// userRouter.put("/edit-info",protect, upload.single("file"), updatePersonalInfo);

// In your routes file, before the upload middleware
userRouter.put("/edit-info", protect, (req, res, next) => {
  console.log("🔵 Route hit: /edit-info");
  console.log("🔵 Headers:", req.headers);
  console.log("🔵 Content-Type:", req.headers['content-type']);
  next();
}, upload.single("file"), updatePersonalInfo);
// userRouter.get("/budget",protect,userBudget)

userRouter.post("/login",login)


module.exports={userRouter};
