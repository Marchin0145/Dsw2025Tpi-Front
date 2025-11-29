import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
export function Protectedroute({children}){
   const {isAuthenticated}=useAuth();
    if(!isAuthenticated){
        return <Navigate to="/login"/>;
    }
    return children;

};