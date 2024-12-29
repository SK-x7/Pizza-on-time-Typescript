import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element; // The children should be a JSX element (React component or DOM element)
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
        console.log("From inside the use Effect=====",isAuthenticated);
    if (!isAuthenticated) {
      return navigate("/login"); // Redirect to login if not authenticated
     // Don't render anything until the redirect happens
    }
    }, [isAuthenticated,navigate])
    

  return <>{children}</>; // Render the protected route if authenticated
}

export default ProtectedRoute;
