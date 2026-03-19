import { useContext, useEffect } from "react"
import ContextStore from "../context/ContextStore"
import { useNavigate } from "react-router-dom"
import AxiosConfig from '../utils/AxiosConfig'
import { API_ENDPOINTS } from "../utils/ApiEndpoints"

const useUser = () => {

    const { user, setUser, clearUser } = useContext(ContextStore)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const result = await AxiosConfig.get(API_ENDPOINTS.GET_CURRENT_USER)

                if (isMounted && result.data) {
                    setUser(result.data)
                }
            } catch (error) {
                console.log("Failed to fetch user info" + error);
                if (isMounted) {
                    clearUser()
                    navigate("/login")
                }
            }
        }

        fetchUserInfo()

        return () => {
            isMounted = false;
        }
    }, [setUser, navigate, user, clearUser])
}

export default useUser