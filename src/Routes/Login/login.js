
import "./login.scss"
import {useContext, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc,updateDoc,} from "firebase/firestore"
import {auth, db} from "../../configs/firebase.config";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../../context/userContext";
import { Input } from "../../components/Input/input";
import { Button } from '../../components/Button/button';

export default function Login(){

    const {setUser} = useContext(UserContext) 

    const [data, setData] = useState({
        email: "",
        password:"",
        error:"",
    })
    const [loading, setLoading] = useState(false);
    const {email,password, error} = data
    const navigate = useNavigate()
    const location = useLocation()
    const redirectToHome = location.state?.path || "/"


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e)=>{
        setLoading(true)
        e.preventDefault()

        if(!email || !password){
            setData({...data, error: " Please complete the form"})
        }
  
        try{

            const result = await signInWithEmailAndPassword(auth, email,password)
            await updateDoc(doc(db,"users", result.user.uid),{
                isOnline: true
            })

            setUser(auth.currentUser)

            setData({
                    email: "",
                    password:"",
                    error:"",
                }
            )
            setLoading(false)
            navigate(redirectToHome, {replace:true})
        }

        catch(error){
            setLoading(false)
            alert(`${error.message}`)
        }
    }
    return(
        <>
            <section>
                <h3>Login to your account</h3>
                <form onSubmit={handleSubmit}>
                    <div className={"input_container"}>
                        <label htmlFor={"email"}>Email</label>
                        <Input type={"text"} name={"email"} value={email} onChange={handleChange}/>
                    </div>
                    <div className={"input_container"}>
                        <label htmlFor={"password"}>Password</label>
                        <Input type={"password"} name={"password"} value={password} onChange={handleChange}/>
                    </div>
                    {error && <p className={"error"}>{data.error}</p>}
                    <div className={"button_container"}>
                        <Button type={"submit"} disabled={loading}>{!loading ? "Login" : "logging in..."}</Button>
                    </div>
                </form>
            </section>
        </>
    )
}