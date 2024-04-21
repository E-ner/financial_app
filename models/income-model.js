module.exports = (sequelize,Sequelize) => {
    const income = sequelize.define("incomes",{
        source:{
            type: Sequelize.STRING,
            allowNull:false
        },
        expected:{
            type: Sequelize.BIGINT,
            defaultValue:0
        },
        actual:{
            type: Sequelize.BIGINT,
            defaultValue:0
        }
    })

    income.sync()
    return income;
}