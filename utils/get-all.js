const { income, expense, savings, invest, loans } = require("../models/models-index");

const get_all_items = (table) => {
  if (table === "income") {
    const _income = income.findAll();
    return _income;
  }
  if (table == "expense") {
    const _expense = expense.findAll();
    return _expense;
  }
  if (table == "savings") {
    const _savings = savings.findAll();
    return _savings;
  }
  if (table == "invests") {
    const _savings = invest.findAll();
    return _savings;
  }
  if (table == "loans") {
    const _loans = loans.findAll();
    return _loans;
  }
};

module.exports = { get_all_items };
