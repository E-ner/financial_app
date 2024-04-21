const { user, income, savings, invest, loans } = require("../models/models-index");

const update_data = (table, options, whereClause) => {
  if (table === "users") {
    const users = user.update(options, whereClause);
    return users;
  }
  if (table === "income") {
    const _income = income.update(options, whereClause);
    return _income;
  }
  if (table === "savings") {
    const _savings = savings.update(options, whereClause);
    return _savings;
  }
  if (table === "invests") {
    const _invests = invest.update(options, whereClause);
    return _invests;
  }
  if (table === "loans") {
    const _loans = loans.update(options, whereClause);
    return _loans;
  }
};

module.exports = { update_data };
