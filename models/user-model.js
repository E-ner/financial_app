module.exports = (sequelize, Sequelizer) => {
  const user = sequelize.define("users", {
    email: {
      type: Sequelizer.STRING,
      allowNull: false,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: Sequelizer.TEXT,
      allowNull: false,
      validate:{
        min:8
      }
    },
    refresToken: {
      type: Sequelizer.TEXT,
      allowNull: false,
    }
  });

  user.sync()
  return user;
};
