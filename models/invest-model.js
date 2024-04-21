module.exports= (sequelize, Sequelize) => {
    const invest = sequelize.define("invests",{
        invest_amount:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        removed_amount:{
            type: Sequelize.INTEGER,
            defaultValue:0
        },
        details:{
            type: Sequelize.STRING,
            allowNull:false,
            unique:true
        }
    })

    invest.sync()
    return invest;
}