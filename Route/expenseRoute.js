const {  addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByUserId}=require("../controller/expenseController");


const expres=require("express");
const expenseRouter=expres.Router();

expenseRouter.post("/add",addExpense);
expenseRouter.get("/getAllExpenses",getAllExpenses);
expenseRouter.get("/:id",getExpenseById);
expenseRouter.put("/:id",updateExpense);
expenseRouter.delete("/:id",deleteExpense);
expenseRouter.get("/user/:userId",getExpensesByUserId);
module.exports={expenseRouter};

   