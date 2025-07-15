const express = require("express");
const { addIncome,editIncome, getAllIncome, getAllIncomeByUserId, getIncomeByDate, deleteIncome } = require("../controller/incomeController");

const incomeRouter = express.Router();

// Define routes
incomeRouter.post("/add", addIncome);
incomeRouter.get("/Allincome", getAllIncome);
incomeRouter.get("/user/:userId", getAllIncomeByUserId);
incomeRouter.get("/income/date/:userId", getIncomeByDate);
incomeRouter.delete("/:id", deleteIncome);
incomeRouter.put('/:id', editIncome); // Include userId as query param

module.exports = incomeRouter;  