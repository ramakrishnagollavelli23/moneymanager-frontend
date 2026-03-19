import { LoaderCircle, Search } from "lucide-react"
import Dashboard from "../../components/Dashboard"
import useUser from "../../hooks/useUser"
import { useState } from "react"
import AxiosConfig from "../../utils/AxiosConfig"
import { API_ENDPOINTS } from "../../utils/ApiEndpoints"
import toast from "react-hot-toast"
import TransactionInfoCard from '../../components/TransactionInfoCard'
import moment from "moment"

const Filter = () => {

  useUser()
  const [type, setType] = useState("income")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [keyword, setKeyword] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(type, startDate, endDate, keyword, sortField, sortOrder);
    try {
      const result = await AxiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type, startDate, endDate, keyword, sortField, sortOrder
      })
      setTransactions(result.data)
      console.log(transactions);
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to get filter data")
      toast.error(error.result?.data?.message || "Failed to get filter data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="rounded-xl bg-white shadow-md py-4 px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-500 font-semibold">Select the filters</h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-6 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <select value={type} id="type" className="w-full border rounded px-3 py-2" onChange={e => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
              <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" id="startDate" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" value={endDate} id="endDate" onChange={e => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort Field</label>
              <select value={sortField} onChange={e => setSortField(e.target.value)} id="sortField" className="w-full border rounded px-3 py-2">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Sort Order</label>
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} id="sortOrder" className="w-full border rounded px-3 py-2">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Keyword</label>
                <input value={keyword} onChange={e => setKeyword(e.target.value)} id="keyword" type={"text"} placeholder="Search..." className="w-full border rounded px-3 py-2" />
              </div>
              <button onClick={handleSearch} className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer">
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="mt-5 min-h-[60vh] rounded-xl bg-white shadow-md py-4 px-2 md:px-6">
          <div className="flex justify-between h-auto items-center mb-4">
            <h2 className="text-lg font-semibold">Transactions</h2>
          </div>
          {
            transactions.length === 0 && !loading ?
              (
                <p className="text-gray-500 text-md">Select the filters and click apply to filter the transactions</p>
              ) :
              ""
          }
          {
            loading ?
              (
                <div className="w-full h-full flex items-center justify-center">
                  <LoaderCircle size={20} className="animate-spin mr-2" />Loading Transactions
                </div>
              ) : ""
          }
          {
            transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
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
    </Dashboard>
  )
}

export default Filter