const express = require('express');

const router = express.Router();
const {
    getAllExpenseCategories,
       getExpenseCategoryById,
       createExpenseCategory,
       updateExpenseCategory,
       deleteExpenseCategory,
} = require('../controller/expenseCategoryController');

// Route to get all categories
router.get('/', getAllExpenseCategories);

// Route to get a category by ID
router.get('/:id',  getExpenseCategoryById);

// Route to create a new category
router.post('/', createExpenseCategory);

// Route to update a category by ID
router.put('/:id',   updateExpenseCategory);

// Route to delete a category by ID
router.delete('/:id',  deleteExpenseCategory);

module.exports = router;  