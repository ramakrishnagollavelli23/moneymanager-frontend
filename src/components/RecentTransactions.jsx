import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="rounded-xl bg-white min-h-[55vh] md:h-auto shadow-md py-4 px-6">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">Recent Transactions</h4>

                <button className="flex cursor-pointer bg-gray-200 px-4 py-1 rounded-md items-center card-btn" onClick={onMore}>
                    More <ArrowRight className="ml-2 text-base" size={15} />
                </button>
            </div>
            <div className="mt-6">
                {
                    transactions.length === 0 ? (
                        <div className="w-full flex justify-center items-center h-[50vh]">
                            <p className="text-gray-400">
                                There is no recent transactions
                            </p>
                        </div>
                    ) : (
                        transactions?.slice(0, 5)?.map((item,i) => {
                            return (
                                <TransactionInfoCard
                                    key={i}
                                    title={item.name}
                                    icon={item.icon}
                                    date={moment(item.date).format("DD MMM YYYY")}
                                    amount={item.amount}
                                    type={item.type}
                                    hideDeleteBtn
                                />
                            )
                        })
                    )
                }
            </div>
        </div >
    )
}

export default RecentTransactions