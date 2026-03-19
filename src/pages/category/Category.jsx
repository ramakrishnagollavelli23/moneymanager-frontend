import { Plus } from "lucide-react"
import Dashboard from "../../components/Dashboard"
import useUser from "../../hooks/useUser"
import CategoryList from "../../components/CategoryList"
import { useEffect, useState } from "react"
import AxiosConfig from "../../utils/AxiosConfig"
import { API_ENDPOINTS } from "../../utils/ApiEndpoints"
import toast from "react-hot-toast"
import Modal from "../../components/Modal"
import AddCategoryForm from "../../components/AddCategoryForm"

const Category = () => {

  useUser()
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false)
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // For fetching the category details
  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const result = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES)
      if (result.status === 200) {
        setCategoryData(result.data)
      }
    } catch (error) {
      console.error("Something went wrong, please try againg" + error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryDetails()
  }, [])

  // For handleing the edit option
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setOpenEditCategoryModal(true)
  }

  // For updating the category
  const handleUpdateCategory = async (category) => {
    const { id, name, type, icon } = category

    if (!id) {
      return toast.error("Category is missing in update")
    }

    if (!name) {
      return toast.error("Category name is requried")
    }

    try {
      const result = await AxiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, icon, type })
      if (result.status) {
        setOpenEditCategoryModal(false)
        setSelectedCategory(null)
        toast.success("Category updated successfully")
        fetchCategoryDetails()
      }
    } catch (error) {
      console.error("Error updating category:", error.result?.data?.message || error.message)
      toast.error(error.result?.data?.message || "Failed to update category")
    }
  }

  // For adding the category
  const handleAddCategory = async (category) => {
    const { name, icon, type } = category

    if (!name.trim()) {
      return toast.error("Category Name is requried")
    }

    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase()
    })

    if (isDuplicate) {
      return toast.error("Category name is already exists.")
    }

    try {
      const result = await AxiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name, icon, type
      })

      if (result.status === 201) {
        toast.success("Category added Successfully")
        setOpenAddCategoryModal(false)
        fetchCategoryDetails()
      }
    } catch (error) {
      console.error("Error added category", error)
      toast.error(error.result?.data?.message || "Failed to added category.")
    }
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 md:mx-auto mx-2">

        {/* { Add button for adding the category } */}
        <div className="flex justify-between mb-5 items-center">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="px-4 py-2 rounded cursor-pointer bg-purple-200 flex items-center gap-1">
            <Plus size={15} />
            <span className="text-sm">Add Category</span>
          </button>
        </div>

        {/* { Category list } */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

        {/* { Adding category modal } */}
        <Modal
          title={"Add Category"}
          isOpen={openAddCategoryModal}
          isClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* { Updating category modal } */}
        <Modal
          title={"Upadate Category"}
          isOpen={openEditCategoryModal}
          isClose={() => { setOpenEditCategoryModal(false); setSelectedCategory(null) }}
        >
          <AddCategoryForm
            isEditing={true}
            initialCategoryData={selectedCategory}
            onEditCategory={handleUpdateCategory}
          />
        </Modal>
      </div>
    </Dashboard>
  )
}

export default Category