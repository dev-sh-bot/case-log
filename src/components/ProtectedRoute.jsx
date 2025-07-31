import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../reducers/authSlice';

const ProtectedRoute = ({ children, loggedIn = false }) => {
    const user = useSelector(selectUser);

    // Check if user has a valid token
    const hasValidToken = user && user.token;

    // Handle routes that should only be accessible to unauthenticated users (e.g., Login)
    if (loggedIn) {
        if (!hasValidToken) {
            return children;
        }
        return <Navigate to="/" replace={true} />;
    }

    // If user is not authenticated or doesn't have a valid token, redirect to login
    if (!hasValidToken) {
        return <Navigate to="/login" replace={true} />;
    }

    // For all authenticated users with valid tokens, show the protected content
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    loggedIn: PropTypes.bool
};

export default ProtectedRoute;