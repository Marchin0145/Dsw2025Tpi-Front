import {useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
export function Protectedroute({children}){
   const {isAuthenticated, isLoading}=useAuth();
   
   if(isLoading){
       return <div>Cargando...</div>;
   }
   
    if(!isAuthenticated){
        return <Navigate to="/admin/login"/>;
    }
    return children;

};