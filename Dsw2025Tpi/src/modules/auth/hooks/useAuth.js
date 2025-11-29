import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
const useAuth=()=> {
    const context= useContext(AuthContext)
    if(!context){
        throw new Error("useAuth no debe ser usado fuera de AuthProvider")
    }
    return {
        isAuthenticated:context.isAuthenticated,
        singIn:context.singIn,
        singOut:context.singOut
    }
} 
export default useAuth