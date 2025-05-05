// src/components/RequireAuth.jsx
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

/**
 * RequireAuth component to protect routes that require authentication.
 * Redirects to the login page if the user is not authenticated.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} The child components or a redirect to the login page.
 */
function RequireAuth({ children }) {
  const { session } = useContext(AuthContext);

  // If there is no session, redirect to the login page
  if (!session) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
