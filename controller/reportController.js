const Report = require("../model/reportModel");
const Expense = require("../model/expenseModel");
const Budget = require("../model/budgetModel");
const Income = require("../model/incomeModel");

async function generateReport(req, res) {
  const { user_id, budget_id } = req.body;

  if (!user_id || !budget_id) {
    return res.status(400).json({
      success: false,
      error: "Both user_id and budget_id are required",
    });
  }

  try {
    // 1. Calculate total expenses for this budget
    const expenses = await Expense.find({ budget_id, user_id });
    const total_expenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // 2. Get the budget details
    const budget = await Budget.findById(budget_id);
    if (!budget) {
      return res.status(404).json({
        success: false,
        error: "Budget not found",
      });
    }

    // 3. Get the associated income
    const income = await Income.findById(budget.income_id);
    if (!income) {
      return res.status(404).json({
        success: false,
        error: "Associated income not found",
      });
    }

    // 4. Calculate balance
    const balance = income.amount - total_expenses;

    // 5. Create and return the report
    const report = await Report.create({
      start_date: budget.start_date,
      end_date: budget.end_date,
      user_id,
      budget_id,
      total_income: income.amount,
      total_expenses,
      balance,
    });

    res.status(201).json({
      success: true,
      data: {
        start_date: report.start_date,
        end_date: report.end_date,
        total_income: report.total_income,
        total_expenses: report.total_expenses,
        balance: report.balance,
      },
    });
  } catch (error) {
    console.error("Report generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { generateReport }; 