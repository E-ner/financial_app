module.exports = (sequelize, Sequelize) => {
  const loan = sequelize.define("loans", {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    loan: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  loan.sync();
  return loan;
};
