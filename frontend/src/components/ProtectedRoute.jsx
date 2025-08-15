import React, { useEffect, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userAuthStore } from '../../store/userAuthStore';

const ProtectedRoute = ({ children }) => {
  const { Authuser, isCheckingAuth, checkAuth, resetAuthState } = userAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute: Component mounted, Authuser:", Authuser, "isCheckingAuth:", isCheckingAuth);
    // Check auth on component mount if we don't have a user
    if (!Authuser && !isCheckingAuth) {
      console.log("ProtectedRoute: Calling checkAuth()");
      checkAuth();
    }

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isCheckingAuth) {
        console.log("ProtectedRoute: Auth check timeout, resetting state");
        resetAuthState();
      }
    }, 10000); // Reduced to 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [Authuser, isCheckingAuth]); // Added dependencies

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg">Checking authentication...</p>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!Authuser) {
    console.log("ProtectedRoute: No user found, redirecting to signin");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  console.log("ProtectedRoute: User authenticated, rendering children");
  return children;
};

export default ProtectedRoute; 