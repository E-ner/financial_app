const express = require("express");
const {
  savingController,
  removeSavings,
} = require("../controller/finance/savInvLoans/saving-controller");
const {
  investController,
  removeInvests,
} = require("../controller/finance/savInvLoans/invest-controller");
const {
  loansCredited,
  loansDebited,
  paidCreditLoans,
  paidDebitLoans,
} = require("../controller/finance/savInvLoans/loans-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const router = express.Router();

router.post("/savings/save", authMiddleware, savingController);
router.put("/savings/withdraw", authMiddleware, removeSavings);
router.post("/invest", authMiddleware, investController);
router.put("/invest/withdraw", authMiddleware, removeInvests);
router.post("/loan/credited", authMiddleware, loansCredited);
router.post("/loan/debited", authMiddleware, loansDebited);
router.put("/loan/credit/pay", authMiddleware, paidCreditLoans);
router.put("/loan/debit/pay", authMiddleware, paidDebitLoans);

module.exports = router;
