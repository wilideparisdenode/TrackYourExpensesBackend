const income = require("../model/incomeModel.js");

const addIncome = async (req, res) => {
  let { amount, source, description, date, user_id } = req.body;
  try {
    const newIncome = new income({ amount, source, description, date, user_id });
    await newIncome.save();
    res.send(newIncome);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllIncome = async (req, res) => {
  try {
    const data = await income.find();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllIncomeByUserId = async (req, res) => {
  let userId = req.params.userId;
  try {
    const data = await income.find({ user_id: userId });
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getIncomeByDate = async (req, res) => {
  let { date } = req.body;
  let userId = req.params.userId;
  try {
    const data = await income.find({ date, user_id: userId });
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  try {
    const deleted = await income.findOneAndDelete({ _id: id, user_id: userId });
    if (deleted) {
      return res.sendStatus(200);
    } else {
      return res.status(404).json({ message: "Income record not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const editIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, source, description, date } = req.body;
  try {
    const updatedIncome = await income.findByIdAndUpdate(
      id,
      { amount, source, description, date },
      { new: true }
    );
    if (updatedIncome) {
      return res.status(200).json(updatedIncome);
    } else {
      return res.status(404).json({ message: "Income record not found or not updated" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  editIncome,
  addIncome,
  getAllIncome,
  getAllIncomeByUserId,
  getIncomeByDate,
  deleteIncome,
};