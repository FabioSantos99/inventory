import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

export const AdminRoute = ({ children }) => {
    const { token, role } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    if (role !== "admin") return <Navigate to="/" replace />
    return children;
};