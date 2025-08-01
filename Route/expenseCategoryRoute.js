const express = require('express');

const router = express.Router();
const {
    getAllExpenseCategories,
       getExpenseCategoryById,
       createExpenseCategory,
       updateExpenseCategory,
       deleteExpenseCategory,
} = require('../controller/expenseCategoryController');
const { protect } = require('../utils/authenticationMidleware');

// Route to get all categories
router.get('/',protect, getAllExpenseCategories);

// Route to get a category by ID
router.get('/:id',protect,  getExpenseCategoryById);

// Route to create a new category
router.post('/',protect, createExpenseCategory);

// Route to update a category by ID
router.put('/:id',protect,   updateExpenseCategory);

// Route to delete a category by ID
router.delete('/:id',protect,  deleteExpenseCategory);

module.exports = router;  