const Budget = require("../model/budgetModel");
const Expense = require("../model/expenseModel");
const income=require ("../model/incomeModel")
const { Op } = require('sequelize'); 
const trackBudget = async (req, res) => {
    const { userId, income_id } = req.params;
    
    try {
        const currentDate = new Date();
        console.log("Fetching budget for:", { userId, income_id, currentDate }); // Debug log

        const budget = await Budget.findOne({
            where: {
                income_id,
                user_id: userId,
                start_date: { [Op.lte]: currentDate },
                end_date: { [Op.gte]: currentDate }
            }
        });
        console.log("Budget found:", budget); // Debug log

        if (!budget) {
            return res.status(404).json({ message: "No active budget found." });
        }

        const totalSpending = await Expense.sum("amount", {
            where: {
                user_id: userId,
                date: { [Op.between]: [budget.start_date, budget.end_date] }
            }
        });
        console.log("Total spending:", totalSpending); // Debug log

        const calculatedTotalSpending = totalSpending || 0;
        const remainingBudget = budget.amount - calculatedTotalSpending;

        res.status(200).json({
            budget: budget.amount,
            totalSpending: calculatedTotalSpending,
            remainingBudget,
            status: remainingBudget >= 0 ? "Within Budget" : "Over Budget",
            currency: "USD"
        });
        
    } catch (err) {
        console.error("Full error in trackBudget:", err); // Log the full error
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};
    async function createBudget(req, res) {
        const { user_id, end_date, description, income_id, amount } = req.body;
        try {
          if (!income_id) {
            return res.status(400).json({ error: "income_id is required" });
          }
      
          // Find the income record
          const icm = await income.findOne({
            where: { id: income_id }
          });
      
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
            description
          });
      
          // Update the income amount
          await income.update(
            { amount: icm.amount - amount },
            { where: { id: income_id } }
          );
      
          res.status(201).json(cbg);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Server error: " + err.message });
        }
      }
      
      
      

    async function  deletbudget(req,res) {
        let {id}=req.params;
      try { let dbg=await Budget.destroy({
            where:{
                id
            }
        });
        if(dbg){
            res.status(200).send({message:"the budget has been deleted"});
        }else{
            res.status(400).send("there was an error deleting the budget");
        }}catch(err){
            throw new Error(err);
        }
    }
  
    async function viewBudget(req, res) {
        const { id } = req.params;
      
        try {
          // 1. Find all budgets for the user
          const budgets = await Budget.findAll({
            where: {
              user_id: id
            }
          });
      
          if (!budgets || budgets.length === 0) {
            return res.status(404).json({
              success: false,
              message: `No budgets found for user with id ${id}`
            });
          }
      
          // 2. Process each budget to calculate spent amounts
          const budgetsWithSpent = await Promise.all(
            budgets.map(async (budget) => {
              // Find expenses for this specific budget
              const expenses = await Expense.findAll({
                where: {
                  budget_id: budget.id
                }
              });
      
              // Calculate total spent
              const spent = expenses.reduce((sum, expense) => {
                return sum + (parseFloat(expense.amount) || 0);
              }, 0);
      
              return {
                ...budget.toJSON(),
                spent
              };
            })
          );
      
          // 3. Send the response
          res.status(200).json({
            success: true,
            data: budgetsWithSpent
          });
      
        } catch (err) {
          console.error("Error in viewBudget:", err);
          res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
          });
        }
      }


module.exports = { trackBudget,viewBudget,createBudget,deletbudget };
