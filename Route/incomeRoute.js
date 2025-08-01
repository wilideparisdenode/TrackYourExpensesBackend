const express = require("express");
const { addIncome,editIncome, getAllIncome, getAllIncomeByUserId, getIncomeByDate, deleteIncome } = require("../controller/incomeController");
const { protect } = require("../utils/authenticationMidleware");

const incomeRouter = express.Router();

// Define routes
incomeRouter.post("/add",protect, addIncome);
incomeRouter.get("/Allincome",protect, getAllIncome);
incomeRouter.get("/user/:userId",protect, getAllIncomeByUserId);
incomeRouter.get("/income/date/:userId",protect, getIncomeByDate);
incomeRouter.delete("/:id",protect, deleteIncome);
incomeRouter.put('/:id',protect, editIncome); // Include userId as query param

module.exports = incomeRouter;  