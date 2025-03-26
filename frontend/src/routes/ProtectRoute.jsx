import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userstore";

const ProtectedRoute = ({ requiredRole }) => {
    const token = useUserStore((state) => state.token);
    const user = useUserStore((state) => state.user);

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />; // Redirect if role doesn't match
    }

    return <Outlet />;
};

export default ProtectedRoute;