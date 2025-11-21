
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!loading && !user && !showToast) {
            toast.error('You must login first!');
            setShowToast(true);
        }
    }, [loading, user, showToast]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
}
