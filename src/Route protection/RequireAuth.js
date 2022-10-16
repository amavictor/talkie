import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/userContext";

export default function ({children}) {
    const {user} = useContext(UserContext)
    const location = useLocation()
    if (!user){
        return <Navigate to={'login'} state={{path:location.pathname}}/>
    }
    return(
        children
    )
}