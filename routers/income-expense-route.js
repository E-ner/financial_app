const express = require("express");
const {
  budgetController,
  actualController,
} = require("../controller/finance/income/income-controller");
const {
  expenseController,
} = require("../controller/finance/expenses/expense-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const router = express.Router();

// Income and expense routes
router.post("/income/expect", authMiddleware, budgetController);
router.post("/income/actual", authMiddleware, actualController);
router.post("/expense", authMiddleware, expenseController);

module.exports = router;
