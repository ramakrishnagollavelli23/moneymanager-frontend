import { Plus } from "lucide-react"
import CustomLineChart from "./CustomLineChart"

const IncomeOverview = ({ transactions, setOpenAddIncomeModal }) => {
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 p-2 md:px-6">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-medium">Income Overview</h5>
                    <p className="md:text-sm text-xs text-gray-400">Track your earnings over time and analyze your income trends.</p>
                </div>
                <button
                    onClick={() => setOpenAddIncomeModal(true)}
                    className="px-4 py-2 rounded cursor-pointer bg-purple-200 flex items-center gap-1">
                    <Plus size={15} />
                    <span className="md:text-sm text-xs">Add Income</span>
                </button>
            </div>
            <div className="mt-10">
                {/* { To display the income in linechart } */}
                <CustomLineChart data={transactions} />
            </div>
        </div>
    )
}

export default IncomeOverview