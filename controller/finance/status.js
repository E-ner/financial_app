const { income, expense, savings, invest, loans } = require("../../models/models-index");
const { get_all_items } = require("../../utils/get-all")

module.exports.financialStatus = async (req,res) => {
    const act_income = await income.sum("actual");
    const expec_income = await income.sum("expected");
    const _expense = await expense.sum("money");
    const _expenses = await get_all_items("expense")
    const sav_savings =  await savings.sum("saved_amount");
    const remv_savin =  await savings.sum("removed_amount");
    const inv_invest = await invest.sum("invest_amount");
    const inv_remv = await invest.sum("removed_amount")
    const credit = await loans.sum("loan",{ where:{ type:"credit" } });
    const debit = await loans.sum("loan", { where: { type: "debit"} })
    const paid_cred = await loans.sum("paid", { where: { type: "credit" } });
    const paid_deb = await loans.sum("paid",{ where:{ type:"debit" } });

    res.status(200).json({
        income: {
            expected:expec_income,
            actual:act_income,
            difference:expec_income - act_income
        },
        expenses:{
            total_expense:_expense,
            expense:_expenses
        },
        savings: {
            remaining:sav_savings,
            removed:remv_savin,
            total_savings:sav_savings + remv_savin
        },
        invests:{
            remaining_invests:inv_invest,
            removed:inv_remv,
            total_invested:inv_invest + inv_remv
        },
        loans: {
            total_credits: credit ,
            total_debits: debit,
            paid_credit: paid_cred,
            paid_debit:paid_deb
        }
    })

}