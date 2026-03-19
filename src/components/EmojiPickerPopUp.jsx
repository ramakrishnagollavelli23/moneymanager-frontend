import EmojiPicker from "emoji-picker-react"
import { Image, X } from "lucide-react"
import { useState } from "react"

const EmojiPickerPopUp = ({ icon, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleEmojiChange = (emoji) => {
        setIsOpen(false)
        onSelect(emoji?.imageUrl || "")
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-4">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (<img src={icon} alt="Icon" className="w-11 h-11" />) : (<Image />)}
                </div>
                <p className="text-gray-500">{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>
            {
                isOpen && (
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute z-50 -top-3 -right-2 cursor-pointer">
                            <X />
                        </button>
                        <EmojiPicker
                            className="absolute top-0 left-0 w-full max-h-[40vh]"
                            open={isOpen}
                            onEmojiClick={handleEmojiChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default EmojiPickerPopUp