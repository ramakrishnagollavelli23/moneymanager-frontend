import axios from "axios";
import { BASE_URL } from "./ApiEndpoints";

const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// For this endpoint we don't need the authorization in header
const excludeEndPoints = ["/login", "/register", "/health", "status", "/activate"]

// For request interceptors
AxiosConfig.interceptors.request.use((request) => {
    const shouldSkipToken = excludeEndPoints.some((endPoint) => {
        return request.url.includes(endPoint)
    })

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`
        }
    }
    return request;
}, (error) => {
    return Promise.reject(error)
})

// For response interceptors
AxiosConfig.interceptors.response.use((response)=>{
    return response
},(error)=>{
    if(error.response){
        if(error.response.status === 401){
            window.location.href="/login"
        }else if(error.response.status===500){
            console.error("Server error, please try again later");
        }
    }else if(error.code ==="ECONNABORTED"){
        console.error("Request timeout, please try again...")
    }
    return Promise.reject(error)
})

export default AxiosConfig;