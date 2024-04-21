const Sequelizer = require("sequelize");
const {
  db_user,
  db_name,
  db_password,
  db_host,
  db_dialect,
  db_pool,
} = require("../config/db-config");

const sequelizer = new Sequelizer(db_name, db_user, db_password, {
  host: db_host,
  dialect: db_dialect,
  pool: db_pool,
});

const db = {};
db.user = require("./user-model")(sequelizer, Sequelizer);
db.income = require("./income-model")(sequelizer, Sequelizer);
db.expense = require("./expense-model")(sequelizer, Sequelizer);
db.savings = require("./saving-model")(sequelizer, Sequelizer);
db.invest = require("./invest-model")(sequelizer, Sequelizer);
db.loans = require("./loans-model")(sequelizer, Sequelizer);
module.exports = db;
