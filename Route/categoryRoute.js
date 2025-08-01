const { viewCategory,deleteCategory,createcategory}=require("../controller/categoryController");
const express=require("express");
const {protect}=require("../utils/authenticationMidleware")
const categoryRouter=express.Router();

categoryRouter.get("/",protect,viewCategory);
categoryRouter.delete("/:id",protect,deleteCategory);
categoryRouter.post("/create",protect,createcategory);

module.exports=categoryRouter;  