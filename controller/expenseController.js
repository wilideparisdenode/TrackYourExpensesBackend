const expense = require("../model/expenseModel");
async function addExpense(req, res) {
    try {
        const { amount, description, date, userId,budget_id, category_id } = req.body;
        
        if (!category_id) {
            return res.status(400).json({
                success: false,
                error: "Category ID is required"
            });
        }

        const newExpense = await expense.create({
            amount,
            description,
            date,
            user_id: userId,
            budget_id,
            category_id
        });
        
        res.status(201).json({
            success: true,
            data: newExpense,
            message: "Expense created successfully"
        });
    } catch (err) {
        console.error("Error creating expense:", err);
        res.status(400).json({
            success: false,
            error: err.message || "Failed to create expense"
        });
    }
}

async function getAllExpenses(req, res) {
    try {
        const expenses = await expense.findAll();
        res.status(200).json({
            success: true,
            data: expenses
        });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch expenses"
        });
    }
}

async function getExpenseById(req, res) {
    try {
        const id = req.params.id;
        const foundExpense = await expense.findByPk(id);
        if (!foundExpense) {
            return res.status(404).json({
                success: false,
                error: "Expense not found"
            });
        }
        res.status(200).json({
            success: true,
            data: foundExpense
        });
    } catch (err) {
        console.error("Error fetching expense:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch expense"
        });
    }
}

async function updateExpense(req, res) {
    try {
        const { amount, description, date } = req.body;
        const id = req.params.id;
        
        const [updated] = await expense.update(
            { amount, description, date },
            { where: { id } }
        );
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                error: "Expense not found"
            });
        }
        
        const updatedExpense = await expense.findByPk(id);
        res.status(200).json({
            success: true,
            data: updatedExpense,
            message: "Expense updated successfully"
        });
    } catch (err) {
        console.error("Error updating expense:", err);
        res.status(500).json({
            success: false,
            error: "Failed to update expense"
        });
    }
}

async function deleteExpense(req, res) {
    try {
        const id = req.params.id;
        const deleted = await expense.destroy({ where: { id } });
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: "Expense not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).json({
            success: false,
            error: "Failed to delete expense"
        });
    }
}

async function getExpensesByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const userExpenses = await expense.findAll({
            where: { user_id: userId },
            order: [['date', 'DESC']]
        });
        
        res.status(200).json({
            success: true,
            data: userExpenses
        });
    } catch (err) {
        console.error("Error fetching user expenses:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch user expenses"
        });
    }
}

module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByUserId
};