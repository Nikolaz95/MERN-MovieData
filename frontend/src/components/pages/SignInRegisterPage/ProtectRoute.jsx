import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../../layouts/Loading/Loading';

const ProtectRoute = ({ children, admin }) => {

    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

    if (loading) return <Loading />;

    if (!isAuthenticated) {
        return <Navigate to="/signIn" replace />
    }

    if (admin && user?.role !== "admin") {
        return <Navigate to="/admin/dashBoard" replace />;
    }

    return children;
}

export default ProtectRoute;