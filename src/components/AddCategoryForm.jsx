import { useEffect, useState } from "react"
import Input from "./Input"
import EmojiPickerPopUp from "./EmojiPickerPopUp"
import { LoaderCircle } from "lucide-react"

const AddCategoryForm = ({ onAddCategory, onEditCategory, isEditing, initialCategoryData }) => {

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    })

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData)
        } else {
            setCategory({ name: "", type: "income", icon: "" })
        }
    }, [isEditing, initialCategoryData])

    // For display the categoryType
    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ]

    // For handleing the onchange function
    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value })
    }

    const handleSubmit = () => {
        setLoading(true)
        try {
            if (!isEditing) {
                onAddCategory(category)
            }
            else {
                onEditCategory(category)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">

            <EmojiPickerPopUp
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                type={"text"}
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label={"Category Name"}
                placeholder={"eg., Freelancer, Salary, Groceries.."}
            />

            <Input
                label={"Category Type"}
                value={category.type}
                isSelect={true}
                options={categoryTypeOptions}
                onChange={({ target }) => handleChange("type", target.value)}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    disabled={loading}
                    className="py-2 px-4 bg-blue-500 rounded-lg text-white cursor-pointer "
                    onClick={handleSubmit}
                >
                    {loading ?
                        (<><LoaderCircle className="w-4 h-4 animate-spin" />{isEditing ? "Updating..." : "Adding..."}</>)
                        :
                        (<>{isEditing ? "Update Category" : "Add Category"}</>)
                    }
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm