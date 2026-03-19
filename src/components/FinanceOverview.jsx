import CustomPieChart from "./CustomPieChart"

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balance = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense }
    ]

    const COLORS = ["#591688", "#016630", "#a0090e"]

    return (
        <div className="rounded-xl min-h-[55vh] md:h-auto bg-white shadow-md py-8 px-2 md:py-4 md:px-6">
            <div className="flex justify-between items-center">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            {
                totalBalance === 0 && totalExpense === 0 && totalIncome === 0 ?
                    (
                        <div className="w-full flex justify-center items-center h-[50vh]">
                            <p className="text-gray-400">
                                There is no recent transactions
                            </p>
                        </div>
                    ) :
                    (<CustomPieChart data={balance} COLORS={COLORS} />)}
        </div>
    )
}

export default FinanceOverview