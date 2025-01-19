import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isPending] = useAdmin();
    const location = useLocation();

    if(loading || isPending) return <Spinner />
    if(user && isAdmin) return children;

    return <Navigate to="/" state={{ from: location }} replace={true} />
};

export default AdminRoute;