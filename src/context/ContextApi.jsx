import { useEffect, useState } from "react"
import ContextStore from "./ContextStore"
import { useNavigate } from "react-router-dom";

const ContextApi = ({ children }) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    const clearUser = () => {
        setUser(null)
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const storedUser = localStorage.getItem("user")
            return storedUser ? setUser(JSON.parse(storedUser)) : navigate("/login");
        }
    }, [navigate])

    const contextValues = {
        user, setUser, clearUser
    }

    return (
        <ContextStore.Provider value={contextValues}>
            {children}
        </ContextStore.Provider>
    )
}

export default ContextApi