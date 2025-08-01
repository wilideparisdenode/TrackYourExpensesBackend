const express=require("express");
const expenses = require("../model/expenseModel");
const { trackBudget,viewBudget,createBudget,deletbudget } = require("../controller/budgetController");
const { protect } = require("../utils/authenticationMidleware");
const budgetRouter=express.Router();

budgetRouter.get("/:id",protect,viewBudget);
budgetRouter.delete("/:id",protect,deletbudget);
budgetRouter.post("/create_budget",protect,createBudget);
budgetRouter.get("/view/:userId/:income_id", protect,trackBudget); 

module.exports=budgetRouter;
   