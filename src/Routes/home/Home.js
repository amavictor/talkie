import Navbar from "../../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import {
    query,
    collection,
    doc,
    onSnapshot,
    where,
    orderBy,
    addDoc,
    Timestamp, setDoc, getDoc, updateDoc,

} from "firebase/firestore"
import { db, storage } from "../../configs/firebase.config";
import User from "../../components/user/user";
import "./home.scss"
import Message from "../../components/Message/Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MessageDisplay from "../../components/MessageDisplay/messageDisplay";
import ProfilePic from "../../assets/profile.png"
import Menu from "../../assets/option.png"
import Info from "../../assets/info.png"
import { Input } from "../../components/Input/input";

export default function Home() {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [msgs, setMsgs] = useState([])
    const [localUser, setLocalUser] = useState(null)


    //setting the current user and the user I'm clicking on
    const currentUser = user.uid
    useEffect(() => {
        
        const usersRef = collection(db, "users")
        //query object
        const q = query(usersRef, where("uid", "!=", currentUser))
        //execute query
        //this snapShot is an observer to listen for snapshots.
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setLocalUser(docSnap.data())
            }//getting the entire user data
        })
    }, [user.uid])

    const selectUser = async (user) => {
        setChat(user)
        /*I am setting chat to the entire user object*/
        //this chat is the current user i'm chatting with.
        //when I click on the name, the user object is passed down to the component and set up here
        console.log(user, "HTis is what I use as chat")

        const user2 = user.uid
        const id = currentUser > user2 ? `${currentUser + user2}` : `${user2 + currentUser}`
        const msgRef = collection(db, "messages", id, "chat")
        const q = query(msgRef, orderBy("sentAt", "asc"))
        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(doc => {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })
        console.log(msgs)
        /*I created a user 2 instance that will be used to query the msgs.
            orderby in the query allows me to arrange the details in ascending or descending order*/


        //trying to update the unread value of the last message.
        //I want the other person I sent the message to to be able to change
        // the state of unread no me. That is how it's supposed to work.

        //I am getting last message between logged in user and selected user
        const docSnap = await getDoc(doc(db, "lastMsg", id))


        //if last message exists and message is from selected user
        if (docSnap.data() && docSnap.data().from !== currentUser) {
            //update last message doc, set unread to false
            await updateDoc(doc(db, "lastMsg", id), {
                unread: false
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user2 = chat.uid //setting the receiver on submit
        const id = currentUser > user2 ? `${currentUser + user2}` : `${user2 + currentUser}`
        //the messages between the two users will be stored here. Its a concatenation of the two user ids
        //so if currentUser sends a message to user 2 of user 2 sends to current user it will be the same

        let url
        if (img) {
            const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`)
            const snap = await uploadBytes(imgRef, img)
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = downloadUrl
        }
        //for sending images
        console.log(img)


        if (text !== "" || img ) {
            await addDoc(collection(db, "messages", id, 'chat'), {
                text,
                from: currentUser,
                to: user2,
                sentAt: Timestamp.fromDate(new Date()),
                media: url || ""
            })
        }

        await setDoc(doc(db, "lastMsg", id), {
            text,
            from: currentUser,
            to: user2,
            sentAt: Timestamp.fromDate(new Date()),
            media: url || "",
            unread: true
        })
        setText("")
        // from the above code, you can't do addDoc on document only update doc
        //so i will need another sub collection to hold the chats
    }

    return (
        <div className={"home_container"}>
            <div className="user_outer_container">
                <section className="user_details_section">
                    <div className="user_details">
                        <div className="user_name_details">
                            <img src={`${localUser?.avatar} || ${ProfilePic} `} alt="Profile" />
                            <h1>{localUser?.name}</h1>
                        </div>

                        <div className="menu">
                            <img src={Menu} alt="option" />
                        </div>
                    </div>
                    <div className="search-section">
                        <Input type={"search"} placeholder={"Search"} />
                    </div>
                </section>
                <div className={"user_container"}>
                    {
                        users.map(user => <User key={user.uid} user={user} selectUser={selectUser} currentUser={currentUser}
                            chat={chat} />)
                    }
                </div>
            </div>

            <div className={"messages_container"}>
                {
                    chat

                        ?

                        (

                            <>
                                <div className={"messages_user"}>
                                    <div className="user_chat_info">
                                        <img src={chat?.avatar} alt="user_image" />
                                        <div className="user_active_details">
                                            <h3>{chat.name}</h3>
                                            <p>Active now</p>
                                        </div>
                                    </div>

                                    <div className="call_and_details">
                                        <img src={Info}
                                            alt="info-icon"
                                        />
                                    </div>
                                </div>
                                <section className="messages_section">
                                    <div className={"messages"}>
                                        {msgs.length ? msgs.map((msg, i) => <MessageDisplay key={i} msg={msg} currentUser={currentUser} />)
                                            : null}
                                    </div>
                                </section>


                                <Message
                                    handleSubmit={handleSubmit}
                                    text={text}
                                    setText={setText}
                                    setImg={setImg}
                                    img={img}
                                />
                            </>

                        )

                        :

                        <h3 className={"no_conv "}>Click on a user to start a conversation </h3>
                }
            </div>
        </div>
    )
}