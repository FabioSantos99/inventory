import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor se for receber 401 é redirecionado para login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username"); 
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

//Products ----------------------------------------------------

export const getAllProducts = () => api.get("/products");
export const saveProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const removeProduct = (id) => api.delete(`/products/${id}`);

//Users -----------------------------------------------------

export const getAllUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ---- Auth -----------------------------------------------------------

export const login = (data) => api.post("/auth/login", data);

export default api;