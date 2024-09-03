import { useContext } from "react";  //con este useContext podremos extraer los datos 
import AuthContext from "../context/AuthProvider";  //con esto se identifica de que context se extraen los datos

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth