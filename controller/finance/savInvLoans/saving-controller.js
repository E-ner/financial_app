const { __find_item } = require("../../../utils/find-item");
const { insert_data } = require("../../../utils/insert-data");
const { get_all_items } = require("../../../utils/get-all");
const { expense, savings } = require("../../../models/models-index");
const { update_data } = require("../../../utils/update-data");

module.exports.savingController = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.saved ||
    (!req.body.details && !req.body.saved)
  ) {
    res.status(400).json({ msg: "details saved required" });
  } else {
    const { details, saved } = req.body;
    if (typeof details !== "string" && typeof saved !== "number") {
      res.status(400).json({ msg: "details and saved amount required" });
    } else {
      const expenses = await __find_item("expense", { type: "savings" });

      if (expenses == null) {
        res.status(400).json({ msg: "savings not found in expenses" });
      } else {
        const _saving = await __find_item("savings", { details: details });
        if (_saving == null) {
          const _expense =
            isNaN(await expense.sum("money", { where: { type: "savings" } })) ==
            true
              ? 0
              : await expense.sum("money", { where: { type: "savings" } });
          const _savings =
            isNaN(await savings.sum("saved_amount")) == true
              ? 0
              : await savings.sum("saved_amount");

          if (
            _savings <= _expense &&
            _savings <= _expense &&
            _savings + saved <= _expense
          ) {
            insert_data("savings", { details: details, saved_amount: saved });
            const all_savs = await get_all_items("savings");
            res.status(201).json({ msg: "saved", _data: all_savs });
          } else {
            const thExpense = await get_all_items("savings");
            res.status(501).json({
              msg: "savings is insufficient",
              total_savings: _savings,
              total_expenses: _expense,
              _data: thExpense,
            });
          }
        } else {
          const saved_amount =
            isNaN(_saving.dataValues.saved_amount) == true
              ? 0
              : _saving.dataValues.saved_amount;
          const added_amount = saved_amount + saved;
          const _expense =
            isNaN(await expense.sum("money", { where: { type: "savings" } })) ==
            true
              ? 0
              : await expense.sum("money", { where: { type: "savings" } });
          const _savings =
            isNaN(await savings.sum("saved_amount")) == true
              ? 0
              : await savings.sum("saved_amount");

          if (
            _savings <= _expense &&
            _savings <= _expense &&
            added_amount <= _expense
          ) {
            update_data(
              "savings",
              { saved_amount: added_amount },
              { where: { details: details } }
            );
            const all_savs = await get_all_items("savings");
            res.status(201).json({ msg: "saved", _data: all_savs });
          } else {
            const thExpense = await get_all_items("savings");
            res.status(501).json({
              msg: "savings is insufficient",
              total_savings: _savings,
              total_expenses: _expense,
              _data: thExpense,
            });
          }
        }
      }
    }
  }
};

module.exports.removeSavings = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.removed ||
    (!req.body.details && !req.body.removed)
  ) {
    res.status(400).json({ msg: "details and removed amount required" });
  } else {
    const { details, removed } = req.body;
    if (typeof details !== "string" && typeof removed !== "number") {
      res.status(400).json({ msg: "details and saved amount required" });
    } else {
      const _savings = await __find_item("savings", { details: details });
      if (_savings == null) {
        res.status(200).json({ msg: `no savings for ${details}` });
      } else {
        const saved_amount =
          isNaN(_savings.dataValues.saved_amount) == true
            ? 0
            : _savings.dataValues.saved_amount;
        const remove_amount =
          isNaN(_savings.dataValues.removed_amount) == true
            ? 0
            : _savings.dataValues.removed_amount;
        const remain_amount = saved_amount - removed;
        if (remain_amount < 0) {
          res
            .status(200)
            .json({
              msg: `money in ${details} saving is insufficient`,
              remain: saved_amount,
            });
        } else {
          update_data(
            "savings",
            {
              removed_amount: remove_amount + removed,
              saved_amount: remain_amount,
            },
            { where: { details: details } }
          );
          insert_data("income", { source: details, actual: removed });
          res.status(201).json({
            msg: "removed",
            _remaining: saved_amount,
            removed: removed,
          });
        }
      }
    }
  }
};
