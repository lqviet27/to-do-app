import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return <div>{props.children}</div>;
};

export default PrivateRoute;
