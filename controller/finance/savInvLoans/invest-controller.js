const { __find_item } = require("../../../utils/find-item");
const { insert_data } = require("../../../utils/insert-data");
const { get_all_items } = require("../../../utils/get-all");
const { expense, invest } = require("../../../models/models-index");
const { update_data } = require("../../../utils/update-data");

module.exports.investController = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.invested ||
    (!req.body.details && !req.body.invested)
  ) {
    res.status(400).json({ msg: "details invested required" });
  } else {
    const { details, invested } = req.body;
    if (typeof details !== "string" && typeof invested !== "number") {
      res.status(400).json({ msg: "details and invested amount required" });
    } else {
      const expenses = await __find_item("expense", { type: "invests" });

      if (expenses == null) {
        res.status(400).json({ msg: "invests not found in expenses" });
      } else {
        const _invest = await __find_item("invests", { details: details });
        if (_invest == null) {
          const _expense =
            isNaN(await expense.sum("money", { where: { type: "invests" } })) ==
            true
              ? 0
              : await expense.sum("money", { where: { type: "invests" } });
          const _invests =
            isNaN(await invest.sum("invest_amount")) == true
              ? 0
              : await invest.sum("invest_amount");
          const total_invests = _invests + invested;

          if (
            _invests <= _expense &&
            invested <= _expense &&
            total_invests <= _expense
          ) {
            insert_data("invests", {
              details: details,
              invest_amount: invested,
            });
            const all_savs = await get_all_items("invests");
            res.status(201).json({ msg: "invested", _data: all_savs });
          } else {
            const thExpense = await get_all_items("invests");
            res.status(501).json({
              msg: "invests is insufficient",
              total_invests: _invests,
              total_expenses: _expense,
              _data: thExpense,
            });
          }
        } else {
          const invest_amount =
            isNaN(_invest.dataValues.invest_amount) == true
              ? 0
              : _invest.dataValues.invest_amount;
          const added_amount = invest_amount + invested;
          const _expense =
            isNaN(await expense.sum("money", { where: { type: "invests" } })) ==
            true
              ? 0
              : await expense.sum("money", { where: { type: "invests" } });
          const _invests =
            isNaN(await invest.sum("invest_amount")) == true
              ? 0
              : await invest.sum("invest_amount");

          if (
            _invests <= _expense &&
            invested <= _expense &&
            added_amount <= _expense
          ) {
            update_data(
              "invests",
              { invest_amount: added_amount },
              { where: { details: details } }
            );
            const all_savs = await get_all_items("invests");
            res.status(201).json({ msg: "invested", _data: all_savs });
          } else {
            const thExpense = await get_all_items("invests");
            res.status(501).json({
              msg: "invests is insufficient",
              total_invests: _invests,
              total_expenses: _expense,
              _data: thExpense,
            });
          }
        }
      }
    }
  }
};

module.exports.removeInvests = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.removed ||
    (!req.body.details && !req.body.removed)
  ) {
    res.status(400).json({ msg: "details and removed amount required" });
  } else {
    const { details, removed } = req.body;
    if (typeof details !== "string" && typeof removed !== "number") {
      res.status(400).json({ msg: "details and invested amount required" });
    } else {
      const _invests = await __find_item("invests", { details: details });
      if (_invests == null) {
        res.status(200).json({ msg: `no invests for ${details}` });
      } else {
        const invest_amount =
          isNaN(_invests.dataValues.invest_amount) == true
            ? 0
            : _invests.dataValues.invest_amount;
        const remove_amount =
          isNaN(_invests.dataValues.removed_amount) == true
            ? 0
            : _invests.dataValues.removed_amount;
        const remain_amount = invest_amount - removed;
        if (remain_amount < 0) {
          res
            .status(200)
            .json({
              msg: `money in ${details} invest is insufficient`,
              remain: invest_amount,
            });
        } else {
          update_data(
            "invests",
            {
              removed_amount: remove_amount + removed,
              invest_amount: remain_amount,
            },
            { where: { details: details } }
          );
          insert_data("income", { source: details, actual: removed });
          res.status(201).json({
            msg: "removed",
            _remaining: invest_amount,
            removed: removed,
          });
        }
      }
    }
  }
};
