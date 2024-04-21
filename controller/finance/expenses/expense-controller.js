const { Sequelize } = require("sequelize");
const { income, expense } = require("../../../models/models-index");
const { insert_data } = require("../../../utils/insert-data");
const { get_all_items } = require("../../../utils/get-all");

module.exports.expenseController = async (req, res) => {
  if (
    !req.body._expense ||
    !req.body.amount ||
    !req.body.type ||
    (!req.body._expense && !req.body.amount && !req.body.type)
  ) {
    res.status(400).json({ msg: "expense,amount and type required" });
  } else {
    const { _expense, amount, type } = req.body;

    if (
      typeof amount !== "number" &&
      typeof _expense !== "string" &&
      typeof type !== "string"
    ) {
      res.status(400).json({
        msg: "amount must be integer, type must be string, _expense must be string",
      });
    } else {
      const _income = isNaN(await income.sum("actual")) == true ? 0: await income.sum("actual");
      const _expenses = isNaN(await expense.sum("money")) == true ? 0: await expense.sum("money");

      if (_expenses <= _income && amount <= _income && (_expenses+amount <= _income)) {
        insert_data("expense", {
          type: type,
          expense: _expense,
          money: amount,
        });
        const thExpense = await get_all_items("expense");
        res.status(201).json({ msg: "created", _data: thExpense });
      } else {
        const thExpense = await get_all_items("expense");
        res.status(501).json({
          msg: "income is insufficient",
          total_income:_income,
          total_expenses:_expenses,
          _data:thExpense
        });
      }
    }
  }
};
