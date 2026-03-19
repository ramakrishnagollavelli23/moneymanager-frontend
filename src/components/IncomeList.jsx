import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const IncomeList = ({ transactions, onDelete }) => {

    return (
        <div className="rounded-xl bg-white py-4 px-6">
            <div className="flex justify-between items-center">
                <h5 className="text-lg">Income Sources</h5>
            </div>
            <div className="grid mt-6 grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {/* { Display the incomes } */}
                {
                    transactions?.map(income => {
                        return (
                            <TransactionInfoCard
                                key={income.id}
                                icon={income.icon}
                                date={moment(income.date).format("DD MMM YYYY")}
                                title={income.name}
                                amount={income.amount}
                                type={'income'}
                                onDelete={() => onDelete(income.id)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default IncomeList