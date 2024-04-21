const { __find_item } = require("../../../utils/find-item");
const { get_all_items } = require("../../../utils/get-all");
const { insert_data } = require("../../../utils/insert-data");
const { update_data } = require("../../../utils/update-data");

module.exports.budgetController = async (req, res) => {
  if (
    !req.body.expected ||
    !req.body.source ||
    (!req.body.source && !req.body.expected)
  ) {
    res.status(400).json({ msg: "budget money required" });
  } else {
    const { expected, source } = req.body;

    if (typeof expected !== "number" && typeof source !== "string") {
      res.status(400).json({ msg: "budget money required" });
    } else {
      insert_data("income", { expected: expected, source: source, actual: 0 });
      const incomeData = await get_all_items("income");

      res.status(201).json({ msg: "created", incomeData: incomeData });
    }
  }
};

module.exports.actualController = async (req, res) => {
  if (!req.body.id || !req.body.amount || (!req.body.id && !req.body.amount)) {
    res.status(400).json({ msg: "income id not provided" });
  } else {
    const { id, amount } = req.body;
    const incomeData = await __find_item("income", { id: id });

    if (incomeData == null) {
      res.json({ msg: "income source not found" });
    } else {
      if (typeof id !== "number" && typeof amount !== "number") {
        res.status(400).json({ msg: "income id not provided" });
      } else {
        update_data("income", { actual: amount }, { where: { id: id } });
        const incomeData = await get_all_items("income");

        res.status(201).json({ msg: "created", incomeData: incomeData });
      }
    }
  }
};
