const { income, expense, savings, invest, loans } = require("../models/models-index");

const insert_data = (table, options) => {
  if (table === "income") {
    const _income = income.create(options);
    return _income
  }
  if (table === "expense") {
    const _expense = expense.create(options);
    return _expense
  }
  if (table === "savings") {
    const _savings = savings.create(options);
    return _savings;
  }
  if (table === "invests") {
    const _invests = invest.create(options);

    return _invests;
  }
  if (table === "loans") {
    const _loans = loans.create(options);
    return _loans;
  }
};

module.exports = { insert_data };
