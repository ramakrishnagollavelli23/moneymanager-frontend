import { Coins, LoaderCircle, Wallet, WalletCards } from "lucide-react"
import Dashboard from "../../components/Dashboard"
import InfoCard from "../../components/InfoCard"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AxiosConfig from "../../utils/AxiosConfig"
import { API_ENDPOINTS } from "../../utils/ApiEndpoints"
import toast from "react-hot-toast"
import RecentTransactions from "../../components/RecentTransactions"
import FinanceOverview from "../../components/FinanceOverview"
import Transactions from "../../components/Transactions"

const Home = () => {

  useUser()

  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchDashboardDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA)
      if (result.status) {
        const dashboard = result.data
        setDashboardData(dashboard)
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to get the dashboard data")
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardDetails()
  }, [])


  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        {
          !dashboardData ? (
            <div className="w-full min-h-[100vh] flex items-center justify-center">
              <LoaderCircle size={50} className="animate-spin" />
            </div>
          ) : (
            <div className="my-5 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* { Display the cards } */}
                <InfoCard
                  label={"Total Balance"}
                  icon={<WalletCards />}
                  value={dashboardData?.totalBalance || 0}
                  color={"bg-purple-800"}
                />
                <InfoCard
                  label={"Total Income"}
                  icon={<Wallet />}
                  value={dashboardData?.totalIncome || 0}
                  color={"bg-green-800"}
                />
                <InfoCard
                  label={"Total Expense"}
                  icon={<Coins />}
                  value={dashboardData?.totalExpense || 0}
                  color={"bg-red-800"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                {/* { Recent transactions } */}
                <RecentTransactions
                  transactions={dashboardData?.recentTranscations}
                  onMore={() => navigate("/expense")}
                />

                {/* { Finance overview chart } */}
                <FinanceOverview
                  totalBalance={dashboardData?.totalBalance}
                  totalExpense={dashboardData?.totalExpense}
                  totalIncome={dashboardData?.totalIncome}
                />

                {/* { Expense transactions } */}
                <Transactions
                  transactions={dashboardData?.recent5Expenses}
                  onMore={() => navigate("/expense")}
                  type={"expense"}
                  title={"Recent Expenses"}
                />

                {/* { Income transactions } */}
                <Transactions
                  transactions={dashboardData?.recent5Incomes}
                  onMore={() => navigate("/income")}
                  type={"income"}
                  title={"Recent Incomes"}
                />

              </div>
            </div>
          )
        }
      </Dashboard>
    </div>
  )
}




export default Home