import {createContext, useEffect, useState} from "react";
import {browserLocalPersistence, onAuthStateChanged, setPersistence} from "firebase/auth"
import {auth} from "../configs/firebase.config";
import Loader from "../components/loader";

export const UserContext = createContext(null)


export function UserProvider ({children}){
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(null)


    useEffect( ()=>{
        const observer =async ()=>{
            onAuthStateChanged(auth, (user)=>{
                setUser(user)
                setLoading(false)
            })
            try{
                await setPersistence(auth,browserLocalPersistence)
            }
            catch (e) {
                alert(e.message)
            }

        }
        observer()
        localStorage.setItem("user", user)

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