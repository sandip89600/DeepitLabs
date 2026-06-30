import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// ProtectedRoute guards routes from guest users and checks role authorization
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading, token } = useContext(AuthContext);

    // Show loading spinner while loading user profile
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    // Redirect to login if user not authenticated
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to dashboard if user role is not authorized for this page
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
