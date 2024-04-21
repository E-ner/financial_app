module.exports= (sequelize, Sequelize) => {
    const savings = sequelize.define("savings",{
        saved_amount:{
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

    savings.sync()
    return savings;
}