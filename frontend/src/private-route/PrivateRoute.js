// src/components/PrivateRoute.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { login, logout } from "../features/auth/authSlice";

const AuthenticateUserByToken = async (token)=>{
   try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/private-auth` , {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.isValid;
   } catch (error) {
    console.error("Token verification failed:", error);
    return false;
   }
}
const PrivateRoute = ({ children }) => {
    const  dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state)=>state.auth.token);

    useEffect(() => {
        const verifyToken = async ()=>{
            if (!token) {
                dispatch(logout());
                navigate("/login");
                localStorage.removeItem("auth")
                return;
            }
            try {
                const isValid = await AuthenticateUserByToken(token);
                if (!isValid) {
                    dispatch(logout());
                    localStorage.removeItem("auth")
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                dispatch(logout());
                localStorage.removeItem("auth")
                navigate("/login");
            } 
        }

        verifyToken();
    }, [token , dispatch , navigate]);


    return token ? children : null;
};
export default PrivateRoute;
