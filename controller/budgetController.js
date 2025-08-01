const Budget = require("../model/budgetModel");
const Expense = require("../model/expenseModel");
const income = require("../model/incomeModel");

// Track budget for a user and income
const trackBudget = async (req, res) => {
  const { userId, income_id } = req.params;
  try {
    const currentDate = new Date();
    // Find the active budget for the user and income
    const budget = await Budget.findOne({
      user_id: userId,
      income_id,
      start_date: { $lte: currentDate },
      end_date: { $gte: currentDate },
    });
    if (!budget) {
      return res.status(404).json({ message: "No active budget found." });
    }
    // Calculate total spending for this budget
    const expenses = await Expense.find({
      user_id: userId,
      date: { $gte: budget.start_date, $lte: budget.end_date },
    });
    const totalSpending = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const remainingBudget = budget.amount - totalSpending;
    res.status(200).json({
      budget: budget.amount,
      totalSpending,
      remainingBudget,
      status: remainingBudget >= 0 ? "Within Budget" : "Over Budget",
      currency: "USD",
    });
  } catch (err) {
    console.error("Full error in trackBudget:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Create a new budget
async function createBudget(req, res) {
  const { user_id, end_date, description, income_id, amount } = req.body;
  try {
    if (!income_id) {
      return res.status(400).json({ error: "income_id is required" });
    }
    // Find the income record
    const icm = await income.findById(income_id);
    if (!icm) {
      return res.status(404).json({ error: "Income record not found" });
    }
    // Check if sufficient income exists
    if (icm.amount < amount) {
      return res.status(400).json({ error: "Insufficient income amount" });
    }
    // Create the budget
    const cbg = await Budget.create({
      income_id,
      amount,
      end_date,
      user_id,
      description,
    });
    // Update the income amount
    icm.amount = icm.amount - amount;
    await icm.save();
    res.status(201).json(cbg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

// Delete a budget
async function deletbudget(req, res) {
  let { id } = req.params;
  try {
    const dbg = await Budget.findByIdAndDelete(id);
    if (dbg) {
      res.status(200).send({ message: "the budget has been deleted" });
    } else {
      res.status(400).send("there was an error deleting the budget");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// View all budgets for a user, with spent amounts
async function viewBudget(req, res) {
  const { id } = req.params;
  try {
    // 1. Find all budgets for the user
    const budgets = await Budget.find({ user_id: id });
    if (!budgets || budgets.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No budgets found for user with id ${id}`,
      });
    }
    // 2. Process each budget to calculate spent amounts
    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        // Find expenses for this specific budget
        const expenses = await Expense.find({ budget_id: budget._id });
        // Calculate total spent
        const spent = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
        return {
          ...budget.toObject(),
          spent,
        };
      })
    );
    // 3. Send the response
    res.status(200).json({
      success: true,
      data: budgetsWithSpent,
    });
  } catch (err) {
    console.error("Error in viewBudget:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

module.exports = { trackBudget, viewBudget, createBudget, deletbudget };
