import { useContext } from "react"
import ContextStore from "../context/ContextStore"
import { User } from "lucide-react"
import { SIDE_BAR_DATA } from "../assets/asserts"
import { useNavigate } from "react-router-dom"

const SideBar = ({ active }) => {

  const navigate = useNavigate()
  const { user } = useContext(ContextStore)

  return (
    <div className="w-64 h-[calc(100vh-80px)] right-border bg-white border-gray-200/50 p-5 sticky top-[72px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user.profileImgUrl ?
          (<img src={user ? user.profileImgUrl : ""} alt="Profile Image" className="w-30 h-30 bg-slate-400 rounded-full" />)
          :
          (<User className="w-20 h-20 text-xl" />)
        }
        <h4 className="font-medium text-gray-950 leading-6" style={{ textTransform: "capitalize" }}>{user.fullName}</h4>
      </div>
      {
        SIDE_BAR_DATA.map(item => (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${item.id}`}
            className={`w-full cursor-pointer flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${active === item.label ? "text-white bg-purple-800" : ""}`}>
            <item.icon className="text-lg" />
            {item.label}
          </button>
        ))
      }
    </div>
  )
}

export default SideBar