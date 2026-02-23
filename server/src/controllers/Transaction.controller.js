const Transaction = require("../src/models/Transaction");
const User = require("../models/User");

exports.addTransaction = async (req, res) => {
  const { amount, type, category, description } = req.body;

  const transaction = await Transaction.create({
    user: req.user,
    amount,
    type,
    category,
    description
  });

  const user = await User.findById(req.user);

  if (type === "income") user.balance += amount;
  else user.balance -= amount;

  await user.save();

  res.json(transaction);
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user });
  res.json(transactions);
};