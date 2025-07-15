const { viewCategory,deleteCategory,createcategory}=require("../controller/categoryController");
const express=require("express");
const categoryRouter=express.Router();

categoryRouter.get("/",viewCategory);
categoryRouter.delete("/:id",deleteCategory);
categoryRouter.post("/create",createcategory);

module.exports=categoryRouter;  