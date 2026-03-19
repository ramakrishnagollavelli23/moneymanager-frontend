import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const Transactions = ({ title, transactions, onMore, type }) => {
    if (transactions.length === 0) return null

    return (
        <div className="rounded-xl min-h-[40vh] bg-white shadow-md py-4 px-6">
            <div className="flex items-center justify-between">
                <h2 className="text-md">{title}</h2>

                <button onClick={onMore} className="flex items-center cursor-pointer py-1 px-4 bg-gray-200 rounded-md">
                    More <ArrowRight className="ml-2" size={18} />
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions?.map((transaction) => (
                        <TransactionInfoCard
                            title={transaction.name}
                            key={transaction.id}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("DD MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Transactions