import { useEffect, useState } from "react"
import Dashboard from "../../components/Dashboard"
import Modal from "../../components/Modal"
import useUser from "../../hooks/useUser"
import AxiosConfig from "../../utils/AxiosConfig"
import { API_ENDPOINTS } from "../../utils/ApiEndpoints"
import toast from "react-hot-toast"
import ExpenseList from "../../components/ExpenseList"
import AddForm from "../../components/AddForm"
import DeleteAlert from "../../components/DeleteAlert"
import ExpenseOverview from "../../components/ExpenseOverview"

const Expense = () => {

  useUser()
  const [loading, setLoading] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [categories, setCategories] = useState([])

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  // For fetch expense by type
  const fetchExpenseBytype = async () => {
    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("expense"))
      if (result.status === 200) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to fetch the expense category")
      toast.error(error.result?.data?.message || "Failed to fetch the expense category")
    }
  }

  // For fetch expense
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE)
      if (result.status === 200) {
        setExpenseData(result.data)
      }
    } catch (err) {
      console.error("Failed to fetch expense details :", err)
      toast.error(err.result?.data?.message || "Failed to fetch expense details")
    } finally {
      setLoading(false)
    }
  }

  // For adding the expense 
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense
    setLoading(true)
    if (!name.trim()) {
      setLoading(false)
      return toast.error("Please enter a name")
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setLoading(false)
      return toast.error("Amount should be a valid number greater than 0")
    }

    if (!date) {
      setLoading(false)
      return toast.error("Please select a date")
    }

    if (!categoryId) {
      setLoading(false)
      return toast.error("Please select a category")
    }

    const today = new Date().toISOString().split("T")[0]
    if (today < date) {
      setLoading(false)
      return toast.error("Date cannot be in the future")
    }

    try {
      const result = await AxiosConfig.post(API_ENDPOINTS.ADD_EXPENSE,
        { name, icon, categoryId, date, amount: Number(amount) }
      )
      if (result.status === 201) {
        toast.success("Expense added successfully")
        fetchExpenseDetails()
        setOpenAddExpenseModal(false)
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to add expense")
      toast.error(error.result?.data?.message || "Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  // For deleting the income
  const deleteExpense = async (id) => {
    setLoading(true)
    try {
      const result = await AxiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
      if (result.status) {
        toast.success("Income deleted successfully")
        setOpenDeleteAlert({ show: false, data: null })
        fetchExpenseDetails()
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to delete expense")
      toast.error(error.result?.data?.message || "Failed to delete expense")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    fetchExpenseBytype()
  }, [])

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>

            {/* { Overview for expense with line chart } */}
            <ExpenseOverview
              transactions={expenseData}
              setOpenAddExpenseModal={setOpenAddExpenseModal}
            />
          </div>

          {/* { Displaying the expense } */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          />

          {/* { Add the expense } */}
          <Modal
            isClose={() => setOpenAddExpenseModal(false)}
            isOpen={openAddExpenseModal}
            title={"Add Expense"}
          >
            <AddForm
              expense="expense"
              onAdd={(expense) => handleAddExpense(expense)}
              categories={categories}
              loading={loading}
              isEditing={false}
            />
          </Modal>

          {/* { Delete the income } */}
          <Modal
            isOpen={openDeleteAlert.show}
            isClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title={"Delete Conformation"}
          >
            <DeleteAlert
              onDelete={() => deleteExpense(openDeleteAlert.data)}
              loading={loading}
              content={"Are you sure want to delete this expense details?"}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense