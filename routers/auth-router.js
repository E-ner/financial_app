const express = require("express");
const { loginController } = require("../controller/auth/login-controller");
const { refreshToken } = require("../controller/auth/token-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const { registerUser } = require("../controller/auth/register-user");
const resetPassword = require("../controller/auth/reset-password");
const { resetLink } = require("../controller/auth/reset-link-controller");

const router = express.Router();

router.post("/login", loginController);
router.patch("/refresh-token", refreshToken);
router.post("/register", registerUser);
router.put("/reset-pwd", resetPassword);
router.get("/reset-link", resetLink);

module.exports = router;
