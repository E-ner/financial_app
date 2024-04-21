const express = require("express");
const { financialStatus } = require("../controller/finance/status");
const { authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/financial/status", authMiddleware, financialStatus);

module.exports = router;