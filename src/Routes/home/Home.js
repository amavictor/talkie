import Navbar from "../../components/Navbar/Navbar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext";
import {query, collection, doc, onSnapshot, where, getDocs} from "firebase/firestore"
import {auth, db} from "../../configs/firebase.config";
import User from "../../components/user/user";
import "./home.scss"
import Message from "../../components/Message/Message";

export default function Home(){
    const {user} = useContext(UserContext)
    const [users,setUsers] = useState([])
    const [chat, setChat] = useState("")
    const [text, setText] = useState("")
    useEffect(()=>{
        const usersRef = collection(db,"users")
        //query object
        const q = query(usersRef,where("uid","!=", user.uid))
        //execute query
        //this snapShot is an observer to listen for snapshots.
        const unsub = onSnapshot(q,(querySnapshot)=>{
            let users = []
            querySnapshot.forEach((doc)=>{
                users.push(doc.data())
            })
            setUsers(users)
        })
        return ()=>unsub()
    },[])

    const selectUser = (user)=>{
        setChat(user)
        /*I am setting chat to the entire user object*/
        console.log(user)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
    }
    return(
        <div className={"home_container"}>
            <div className={"user_container"}>
                {users.map(user=> <User key={user.uid} user={user} selectUser ={selectUser} />)}
            </div>
            <div className={"messages_container"}>
                { chat
                    ?
                    (
                        <>
                            <div className={"messages_user"}>
                                <h3>{chat.name}</h3>
                            </div>
                            <Message/>
                        </>

                    )
                :
                <h3 className={"no_conv "}>Click on a user to start a conversation </h3>
                }
            </div>
        </div>
    )
}