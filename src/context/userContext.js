import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../configs/firebase.config";
import Loader from "../components/loader";

export const UserContext = createContext(null)


export function UserProvider ({children}){
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(null)


    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            setUser(user)
            setLoading(false)
        })
    },[])

    if (loading){
        return <Loader/>
    }
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}