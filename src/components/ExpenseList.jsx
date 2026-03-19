import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const ExpenseList = ({ transactions, onDelete }) => {

    return (
        <div className="rounded-xl bg-white py-4 md:px-6 px-2">
            <div className="flex justify-between items-center">
                <h5 className="text-lg">Expense Sources</h5>
            </div>
            <div className="grid mt-6 grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {/* { Display the expense } */}
                {
                    transactions?.map(expense => {
                        return (
                            <TransactionInfoCard
                                key={expense.id}
                                icon={expense.icon}
                                date={moment(expense.date).format("DD MMM YYYY")}
                                title={expense.name}
                                amount={expense.amount}
                                type={'expense'}
                                onDelete={() => onDelete(expense.id)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExpenseList