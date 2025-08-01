const ExpenseCategory = require('../model/expenseCategoryModel');

// Controller to get all expense categories
const getAllExpenseCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense categories', error });
  }
};

// Controller to get a single expense category by ID
const getExpenseCategoryById = async (req, res) => {
  try {
    const category = await ExpenseCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense category', error });
  }
};

// Controller to create a new expense category
const createExpenseCategory = async (req, res) => {
  try {
    const { expense_id, category_id } = req.body;
    const newCategory = new ExpenseCategory({ expense_id, category_id });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense category', error });
  }
};

// Controller to update an expense category
const updateExpenseCategory = async (req, res) => {
  try {
    const { expense_id, category_id } = req.body;
    const updatedCategory = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      { expense_id, category_id },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense category', error });
  }
};

// Controller to delete an expense category
const deleteExpenseCategory = async (req, res) => {
  try {
    const deleted = await ExpenseCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json({ message: 'Expense category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense category', error });
  }
};

module.exports = {
  getAllExpenseCategories,
  getExpenseCategoryById,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};
