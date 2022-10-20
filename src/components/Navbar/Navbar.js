import "./Navbar.scss"
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {auth,db} from "../../configs/firebase.config";
import {signOut } from "firebase/auth";
import {useContext, useEffect} from "react";
import {updateDoc, doc} from "firebase/firestore";
import {UserContext} from "../../context/userContext";

export default function (){

    const {user,setUser} = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleSignOut =async ()=>{
        await updateDoc(doc(db,"users", auth.currentUser.uid), {
            isOnline: false
        })
        await signOut(auth)
        const redirectToHome = location.state?.path || "login"
        navigate(redirectToHome, {replace:true})
        localStorage.removeItem("user")
    }
    return(
        <>
            <nav>
                <h3><NavLink to={"/"}>Messenger</NavLink></h3>
                <div>
                    {user ?
                        <>
                            <Link to={"profile"}>Profile</Link>
                            <button onClick={handleSignOut}>Logout</button>
                        </>
                    :
                        <div>
                            <Link to={"login"}>Login</Link>
                            <Link to={"register"}>Register</Link>
                        </div>

                    }
                </div>
            </nav>
        </>
    )
}