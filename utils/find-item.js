const { user, income, expense, savings, invest, loans } = require("../models/models-index");

const __find_item = (table_name, option) => {
  if (table_name == "users") {
    const user_name = user.findOne({
      where: option,
    });

    return user_name;
  }

  if (table_name === "income") {
    const _income = income.findOne({
      where:option
    })

    return _income;
  }
  if (table_name === "expense") {
    const _expense = expense.findOne({
      where:option
    })

    return _expense;
  }
  if (table_name === "savings") {
    const _savings = savings.findOne({
      where:option
    })

    return _savings;
  }
  if (table_name === "invests") {
    const _savings = invest.findOne({
      where:option
    })

    return _savings;
  }
  if (table_name === "loans") {
    const _loans = loans.findOne({
      where:option
    })

    return _loans;
  }
};

module.exports = { __find_item };
