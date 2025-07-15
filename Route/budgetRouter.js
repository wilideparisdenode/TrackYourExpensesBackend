const express=require("express");
const expenses = require("../model/expenseModel");
const { trackBudget,viewBudget,createBudget,deletbudget } = require("../controller/budgetController");
const budgetRouter=express.Router();

budgetRouter.get("/:id",viewBudget);
budgetRouter.delete("/:id",deletbudget);
budgetRouter.post("/create_budget",createBudget);
budgetRouter.get("/view/:userId/:income_id", trackBudget); 

module.exports=budgetRouter;
   