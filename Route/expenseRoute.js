const {  addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByUserId}=require("../controller/expenseController");


const expres=require("express");
const { protect } = require("../utils/authenticationMidleware");
const expenseRouter=expres.Router();

expenseRouter.post("/add",protect,addExpense);
expenseRouter.get("/getAllExpenses",protect,getAllExpenses);
expenseRouter.get("/:id",protect,getExpenseById);
expenseRouter.put("/:id",protect,updateExpense);
expenseRouter.delete("/:id",protect,deleteExpense);
expenseRouter.get("/user/:userId",protect,getExpensesByUserId);
module.exports={expenseRouter};

   