const ExpenseCategory = require('../model/expenseCategoryModel');

// Controller to get all expense categories
const getAllExpenseCategories = async (req, res) => {
    try {
        const categories = await ExpenseCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expense categories', error });
    }
};

// Controller to get a single expense category by ID
const getExpenseCategoryById = async (req, res) => {
    try {
        const category = await ExpenseCategory.findByPk(req.params.id);
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
        const { name, description } = req.body;
        const newCategory = await ExpenseCategory.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating expense category', error });
    }
};

// Controller to update an expense category
const updateExpenseCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [updatedRowsCount, updatedRows] = await ExpenseCategory.update(
            { name, description },
            {
                where: { id: req.params.id },
                returning: true, // to get the updated row(s) back
            }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Expense category not found' });
        }

        res.status(200).json(updatedRows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense category', error });
    }
};

// Controller to delete an expense category
const deleteExpenseCategory = async (req, res) => {
    try {
        const deletedRowsCount = await ExpenseCategory.destroy({
            where: { id: req.params.id },
        });

        if (deletedRowsCount === 0) {
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
