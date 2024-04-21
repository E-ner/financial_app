const express = require("express");
const { app_port } = require("./config/app-config");
const app = express();

const auth_router = require("./routers/auth-router");
const incomeExpense = require("./routers/income-expense-route");
const savingsInvLoan = require("./routers/savInvLoanRoute")
const finStatus = require("./routers/financial-status");
const port = app_port || 4000;
app.use(express.json());
app.use("/api/v1/", auth_router);
app.use("/api/v1", incomeExpense);
app.use("/api/v1", savingsInvLoan);
app.use("/api/v1", finStatus);
app.all("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});
app.listen(port, async () => {
  console.log("Server listening on port", port);
});
