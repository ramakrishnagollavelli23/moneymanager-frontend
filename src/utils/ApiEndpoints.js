export const BASE_URL = "http://localhost:8082/api/v1.0/";
const CLOUDINARY_CLOUD_NAME = "dhoy7ezfk"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_CURRENT_USER: "/profile",
    DASHBOARD_DATA: "/dashboard",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/income",
    GET_CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/income",
    DELETE_INCOME: (id) => `/income/${id}`,
    GET_ALL_EXPENSE: "/expense",
    ADD_EXPENSE: "/expense",
    DELETE_EXPENSE: (id) => `/expense/${id}`,
    APPLY_FILTER: "/filter",
    UPLOAD_PROFILE_IMG: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}