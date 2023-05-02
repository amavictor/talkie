
import "./Register.scss"
import {useContext, useState} from "react";
import {browserLocalPersistence, createUserWithEmailAndPassword, setPersistence} from "firebase/auth";
import {setDoc,collection,doc,serverTimestamp,Timestamp} from "firebase/firestore"
import {auth, db} from "../../configs/firebase.config";
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/userContext";
import { Input } from '../../components/Input/input';
import { Button } from '../../components/Button/button';

export default function Register(){
    const {user,setUser} = useContext(UserContext)
    //collection Ref
    /*const userCollection = collection(db,"users")*/
    const [data, setData] = useState({
        name: "",
        email: "",
        password:"",
        error:"",
    })
    const [loading, setLoading] = useState(false);
    const {name,email,password, error} = data
    const navigate = useNavigate()
    const location = useLocation()
    const redirectToHome = location.state?.path || "/"


    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        setLoading(true)
        e.preventDefault()

        if(!name || !email || !password){
            setData({...data, error: " Please complete the form"})
        }
        try{


            const result = await createUserWithEmailAndPassword(auth, email,password)
            const currenUser = result.user
            setUser(auth.currentUser)
            await setDoc(doc(db,"users", currenUser.uid), {
                uid:currenUser.uid,
                ...data,
                createdAt:/*Timestamp.fromDate(new Date())*/ serverTimestamp(),
                isOnline:true
            })
            /*localStorage.setItem("user", user)*/
            //or await setDoc(doc(db,"user",result.user.uid),{...}//the data)
            //setDocand updateDoc takes the reference and the id then the data

          /*  console.log(currenUser)*///the .user will show the major details
            setData({
                name: "",
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
                <h3>Create an account</h3>
                <form onSubmit={handleSubmit}>
                    <div className={"input_container"}>
                        <label htmlFor={"name"}>Name</label>
                        <Input type={"text"} name={"name"} value={name} onChange={handleChange}/>
                    </div>
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
                        <Button type={"submit"} disabled={loading}>{!loading ? "Register" : "loading..."}</Button>
                    </div>
                </form>
            </section>
        </>
    )
 }