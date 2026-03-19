import { useEffect, useState } from "react"
import Dashboard from "../../components/Dashboard"
import Modal from "../../components/Modal"
import useUser from "../../hooks/useUser"
import AxiosConfig from "../../utils/AxiosConfig"
import { API_ENDPOINTS } from "../../utils/ApiEndpoints"
import toast from "react-hot-toast"
import IncomeList from "../../components/IncomeList"
import AddForm from "../../components/AddForm"
import DeleteAlert from "../../components/DeleteAlert"
import IncomeOverview from "../../components/IncomeOverview"

const Income = () => {

  useUser()
  const [loading, setLoading] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [categories, setCategories] = useState([])

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  // For fetch income by type
  const fetchIncomeBytype = async () => {
    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("income"))
      if (result.status === 200) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to fetch the income category")
      toast.error(error.result?.data?.message || "Failed to fetch the income category")
    }
  }

  // For fetch income
  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
      if (result.status === 200) {
        setIncomeData(result.data)
      }
    } catch (err) {
      console.error("Failed to fetch income details :", err)
      toast.error(err.result?.data?.message || "Failed to fetch income details")
    } finally {
      setLoading(false)
    }
  }

  // For adding the income 
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income
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
      const result = await AxiosConfig.post(API_ENDPOINTS.ADD_INCOME,
        { name, icon, categoryId, date, amount: Number(amount) }
      )
      if (result.status === 201) {
        toast.success("Income added successfully")
        fetchIncomeDetails()
        setOpenAddIncomeModal(false)
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to add income")
      toast.error(error.result?.data?.message || "Failed to add income")
    } finally {
      setLoading(false)
    }
  }

  // For deleting the income
  const deleteIncome = async (id) => {
    setLoading(true)
    try {
      const result = await AxiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
      if (result.status) {
        toast.success("Income deleted successfully")
        setOpenDeleteAlert({ show: false, data: null })
        fetchIncomeDetails()
      }
    } catch (error) {
      console.error(error.result?.data?.message || "Failed to delete income")
      toast.error(error.result?.data?.message || "Failed to delete income")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
    fetchIncomeBytype()
  }, [])

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>

            {/* { Overview for income with line chart } */}
            <IncomeOverview
              transactions={incomeData}
              setOpenAddIncomeModal={setOpenAddIncomeModal}
            />
          </div>

          {/* { Displaying the income } */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          />

          {/* { Add the income } */}
          <Modal
            isClose={() => setOpenAddIncomeModal(false)}
            isOpen={openAddIncomeModal}
            title={"Add Income"}
          >
            <AddForm
              onAdd={(income) => handleAddIncome(income)}
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
              onDelete={() => deleteIncome(openDeleteAlert.data)}
              loading={loading}
              content={"Are you sure want to delete this income details?"}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Income