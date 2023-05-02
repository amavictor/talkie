
import ProfilePic from "../../assets/profile.png"
import "./user.scss"
import { useEffect, useState } from "react";
import { doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../configs/firebase.config";



export default function User({
    user,
    selectUser,
    currentUser,
    chat
}) {
    const user2 = user?.uid
    const [data, setData] = useState("")

    useEffect(() => {
        const id = currentUser > user2 ? `${currentUser + user2}` : `${user2 + currentUser}`
        let unsub = onSnapshot(doc(db, "lastMsg", id), doc => {
            setData(doc.data())
        })

        return () => unsub()
    }, [currentUser, user2])


    return (
        <>
            <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
                onClick={() => selectUser(user)}>
                <div className={"user_info"}>
                    <div className={"user_detail"}>
                        <img src={user.avatar || ProfilePic} alt={"avatar"} className={"avatar"} />
                        <h4>{user.name}</h4>
                        {data?.from !== currentUser && data?.unread && <small className={"unread"}>New</small>}
                    </div>
                    <div className={`user_status ${user.isOnline ? "online" : "offline"}`} />
                </div>

                {
                    data &&
                    <p className={"truncate"}>
                        <strong>{data.from === currentUser ? "Me:" : null} </strong>
                        {data.text}
                    </p>
                }
            </div>

            <div
                onClick={() => selectUser(user)}
                className={`small_container ${chat.name === user.name && "selected_user"}`}>
                <img src={user.avatar || ProfilePic} alt={"avatar"} className={"avatar small_screen"} />
            </div>
        </>

    )
}