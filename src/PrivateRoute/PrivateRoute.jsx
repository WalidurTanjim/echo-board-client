import React from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading) return <Spinner />

    if(user) return children;

    return <Navigate to='/sign-in' state={{ from: location }} replace={true} />
};

export default PrivateRoute;