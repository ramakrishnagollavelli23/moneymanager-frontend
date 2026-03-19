import { LoaderCircle } from "lucide-react"

const DeleteAlert = ({ content, onDelete, loading }) => {
    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    disabled={loading}
                    className="py-2 px-4 bg-blue-500 rounded-lg text-white cursor-pointer "
                    onClick={onDelete}
                >
                    {loading ?
                        (<><LoaderCircle className="w-4 h-4 animate-spin" />Deleting...</>)
                        :
                        (<>Delete</>)
                    }
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert