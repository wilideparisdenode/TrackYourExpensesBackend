const expense = require("../model/expenseModel");

async function addExpense(req, res) {
  try {
    const { amount, description, date, userId, budget_id, category_id } = req.body;
    if (!category_id) {
      return res.status(400).json({
        success: false,
        error: "Category ID is required",
      });
    }
    const newExpense = new expense({
      amount,
      description,
      date,
      user_id: userId,
      budget_id,
      category_id,
    });
    await newExpense.save();
    res.status(201).json({
      success: true,
      data: newExpense,
      message: "Expense created successfully",
    });
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(400).json({
      success: false,
      error: err.message || "Failed to create expense",
    });
  }
}

async function getAllExpenses(req, res) {
  try {
    const expenses = await expense.find();
    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch expenses",
    });
  }
}

async function getExpenseById(req, res) {
  try {
    const id = req.params.id;
    const foundExpense = await expense.findById(id);
    if (!foundExpense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      data: foundExpense,
    });
  } catch (err) {
    console.error("Error fetching expense:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch expense",
    });
  }
}

async function updateExpense(req, res) {
  try {
    const { amount, description, date } = req.body;
    const id = req.params.id;
    const updatedExpense = await expense.findByIdAndUpdate(
      id,
      { amount, description, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedExpense,
      message: "Expense updated successfully",
    });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update expense",
    });
  }
}

async function deleteExpense(req, res) {
  try {
    const id = req.params.id;
    const deleted = await expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete expense",
    });
  }
}

async function getExpensesByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const userExpenses = await expense.find({ user_id: userId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: userExpenses,
    });
  } catch (err) {
    console.error("Error fetching user expenses:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user expenses",
    });
  }
}

module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByUserId,
};