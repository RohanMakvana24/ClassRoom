import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const CheckIsAuthenticated = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If authenticated, redirect to home
        if (isAuthenticated) {
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/home");
            }
            navigate("/home");
        }
    }, [isAuthenticated, navigate, location.pathname]);
    return children;
};

export default CheckIsAuthenticated;
