import { Layers2, Pencil } from "lucide-react"

const CategoryList = ({ categories, onEditCategory }) => {
    return (
        <div className="card p-4">
            <div className="flex items-center mb-5">
                <h5 className="text-lg font-semibold">Category Sources</h5>
            </div>
            {/* { Category List } */}
            {
                categories.length === 0 ?
                    <p className="text-gray-500">No categories added yet. Add some to get started!</p> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/50">

                                    {/* { Category icon } */}
                                    <div className="w-12 flex items-center justify-center py-2 text-xl text-gray-800 bg-gray-100 rounded-full">
                                        {category.icon ?
                                            (
                                                <span className="text-xl">
                                                    <img src={category.icon} alt={category.name} className="w-5 h-5" />
                                                </span>
                                            )
                                            :
                                            (
                                                <Layers2 className="text-purple-800" size={24} />
                                            )
                                        }
                                    </div>

                                    {/* { Category details } */}
                                    <div className="flex-1 flex items-center justify-between capitalize">
                                        <div>
                                            <p className="text-sm text-gray-800 font-medium">
                                                {category.name}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {category.type}
                                            </p>
                                        </div>
                                    </div>

                                    {/* { Category details } */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEditCategory(category)}
                                            className="text-gray-400 hover:text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default CategoryList