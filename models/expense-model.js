module.exports= (sequelizer,Sequelizer) => {
    const expense = sequelizer.define("expenses",{
        type:{
            type: Sequelizer.STRING,
            allowNull:false
        },
        expense:{
            type: Sequelizer.STRING,
            allowNull:false
        },
        money:{
            type: Sequelizer.INTEGER,
            allowNull:false,
            defaultValue:0
        }
    },{
        freezeTableName:true
    })

    expense.sync()
    return expense;
}