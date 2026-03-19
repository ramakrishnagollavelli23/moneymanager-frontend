import { useState } from "react"
import EmojiPickerPopUp from "./EmojiPickerPopUp"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"

const AddForm = ({ expense, onAdd, categories, loading, isEditing }) => {

    // For displaying the category types
    const categoriesOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))

    const [income, setIncome] = useState({
        name: '',
        icon: '',
        categoryId: categoriesOptions[0].value,
        amount: '',
        date: ''
    })

    // For handling the onchange function
    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value })
    }

    return (
        <div>
            <EmojiPickerPopUp
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label={`${expense?"Expense":"Income"} Name`}
                placeholder={"e.g., Salary, Freelancer..."}
                type={"text"}
            />

            <Input
                value={income.categoryId}
                label={"Category"}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoriesOptions}
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label={"Amount"}
                placeholder={"e.g., 50000,20000"}
                type={"number"}
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label={"Date"}
                placeholder={""}
                type={"date"}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="py-2 px-4 bg-blue-500 rounded-lg text-white cursor-pointer "
                    onClick={() => onAdd(income)}
                >
                    {loading ?
                        (<><LoaderCircle className="w-4 h-4 animate-spin" />{isEditing ? "Updating..." : "Adding..."}</>)
                        :
                        (<>{expense? isEditing?"Update Expense":"Add Expense" : isEditing?"Update Income":"Add Income"}</>)
                    }
                </button>
            </div>
        </div>
    )
}

export default AddForm