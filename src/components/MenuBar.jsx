import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ContextStore from '../context/ContextStore'
import { LogOut, Menu, User, X } from "lucide-react"
import { asserts } from '../assets/asserts'
import SideBar from "./SideBar"

const MenuBar = ({ active }) => {

    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const dropdownRef = useRef()
    const { user, clearUser } = useContext(ContextStore)

    const handleLogoutBtn = () => {
        clearUser()
        localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutSide)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
    },[showDropdown])

    return (
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            {/* { Left side logo and menu } */}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                    {openSideMenu ? (<X className="text-2xl" />) : (<Menu className="text-2xl" />)}
                </button>

                <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2" to={"/dashboard"}>
                        <img src={asserts.logo} alt="Logo" className="w-10 h-10" />
                        <span className="text-lg font-medium text-black truncate">Money Manager</span>
                    </Link>
                </div>
            </div>

            {/* { Right side profile picture } */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
                    <User className="text-purple-500" />
                </button>

                {/* { Dropdown menu } */}
                {
                    showDropdown ? (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            {/* { User info } */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                        <User className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate" style={{ textTransform: "capitalize" }}>
                                            {user.fullName ? user.fullName : ""}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email ? user.email : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* { Drop option } */}
                            <div className="py-1">
                                <button
                                    onClick={handleLogoutBtn}
                                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                    <LogOut className="w-4 h-4 text-gray-500" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex"></div>
                    )
                }
            </div>

            {/* { Mobile view sidebar } */}
            {
                openSideMenu &&
                <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                    <SideBar active={active} />
                </div>
            }
        </div>
    )
}

export default MenuBar