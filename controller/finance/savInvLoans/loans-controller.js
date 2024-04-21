const { __find_item } = require("../../../utils/find-item");
const { get_all_items } = require("../../../utils/get-all");
const { insert_data } = require("../../../utils/insert-data");
const { update_data } = require("../../../utils/update-data");

module.exports.loansCredited = async (req, res) => {
  if (
    !req.body.details ||
    !req.body.loan ||
    (!req.body.details && !req.body.loan)
  ) {
    res.status(400).json({ msg: "details loan required" });
  } else {
    const { details, type, loan } = req.body;
    if (typeof details !== "string" && typeof loan !== "number") {
      res.status(400).json({ msg: "loan details required" });
    } else {
      const _loans = await __find_item("loans", {
        details: details,
        type: "credit",
      });
      if (_loans == null) {
        insert_data("loans", { details: details, type: "credit", loan: loan });
        const all_savs = await get_all_items("loans");
        res.status(201).json({ msg: `${details} loan`, _data: all_savs });
      } else {
        const added_amount = _loans.dataValues.loan + loan;

        update_data(
          "loans",
          { loan: added_amount },
          { where: { details: details, type: "credit" } }
        );
        const all_savs = await get_all_items("loans");
        res
          .status(201)
          .json({ msg: `${details} loan of ${added_amount}`, _data: all_savs });
      }
    }
  }
};

module.exports.loansDebited = async (req, res) => {
  try {
    if (
      !req.body.details ||
      !req.body.loan ||
      (!req.body.details && !req.body.loan)
    ) {
      res.status(400).json({ msg: "details loan required" });
    } else {
      const { details, type, loan } = req.body;
      if (typeof details !== "string" && typeof loan !== "number") {
        res.status(400).json({ msg: "loan details required" });
      } else {
        const _loans = await __find_item("loans", {
          details: details,
          type: "debit",
        });
        if (_loans == null) {
          insert_data("loans", { details: details, type: "debit", loan: loan });
          const all_savs = await get_all_items("loans");
          res
            .status(201)
            .json({ msg: `to ${details} loan of ${loan}`, _data: all_savs });
        } else {
          const added_amount = _loans.dataValues.loan + loan;

          update_data(
            "loans",
            { loan: added_amount },
            { where: { details: details, type: "debit" } }
          );
          const all_savs = await __find_item("loans", { type: "debit" });
          res.status(201).json({
            msg: `to ${details} loan of ${added_amount}`,
            _data: all_savs,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports.paidCreditLoans = async (req, res) => {
  if (
    !req.body.paid ||
    !req.body.details ||
    (!req.body.details && !req.body.paid)
  ) {
    res.status(400).json({ msg: "paid loan amount required" });
  } else {
    const { paid, details } = req.body;
    const loan = await __find_item("loans", {
      details: details,
      type: "credit",
    });

    if (loan === null) {
      res.status(400).json({ msg: `loan ${details} credited not found` });
    } else {
      const loan_val =
        isNaN(loan.dataValues.loan) == true ? 0 : loan.dataValues.loan;

      const unpaid_l = loan_val - paid;

      if (unpaid_l < 0) {
        res.json({ msg: `${details} loan paid remaining ${loan_val}` });
      } else {
        const _paid = loan.dataValues.paid + paid;

        update_data(
          "loans",
          { paid: _paid, loan: unpaid_l },
          { where: { type: "credit", details: details } }
        );
        res
          .status(201)
          .json({
            msg: "loan paid",
            _data: { details: details, paid: _paid, unpaid: unpaid_l },
          });
      }
    }
  }
};

module.exports.paidDebitLoans = async (req, res) => {
  if (
    !req.body.paid ||
    !req.body.details ||
    (!req.body.details && !req.body.paid)
  ) {
    res.status(400).json({ msg: "loan payment details required" });
  } else {
    const { paid, details } = req.body;
    const loan = await __find_item("loans", {
      details: details,
      type: "debit",
    });

    if (loan === null) {
      res.status(400).json({ msg: `loan ${details} debited not found` });
    } else {
      const loan_val =
        isNaN(loan.dataValues.loan) == true ? 0 : loan.dataValues.loan;

      const unpaid_l = loan_val - paid;

      if (unpaid_l < 0) {
        res.json({ msg: `${details} loan paid remaining ${loan_val}` });
      } else {
        const _paid = loan.dataValues.paid + paid;

        update_data(
          "loans",
          { paid: _paid, loan: unpaid_l },
          { where: { type: "debit", details: details } }
        );
        res
          .status(201)
          .json({
            msg: "loan paid",
            _data: { details: details, paid: _paid, unpaid: unpaid_l },
          });
      }
    }
  }
};
