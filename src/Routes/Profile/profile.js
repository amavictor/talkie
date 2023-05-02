import "./profile.scss"
import profilePic from "../../assets/profile.png"
import camera from "../../assets/camera.svg"
import deletePic from "../../assets/delete.png"
import {ref, getDownloadURL,uploadBytes,deleteObject} from "firebase/storage"
import {useContext, useEffect, useState} from "react";
import {storage, db} from "../../configs/firebase.config";
import {getDoc,doc,updateDoc} from "firebase/firestore"
import {UserContext} from "../../context/userContext";
export default function Profile(){
    const [img, setImg] = useState("")
    const {user} = useContext(UserContext)
    const [localUser, setLocalUser] = useState()//this localUser will be used toi get user details in th doc
    useEffect(()=>{
        getDoc(doc(db,"users", user.uid)).then((docSnap)=>{
            if(docSnap.exists) {
                setLocalUser(docSnap.data())
            }//getting the entire user data
        })

        console.log(localUser)

        if(img){
            const uploadImg = async ()=>{
                const imgRef = ref(
                    storage,
                    `avatar/${new Date().getTime()} - ${img.name}`
                )
                
                try{
                    if(localUser.avatarPath){
                        await deleteObject(ref(storage, localUser.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img)
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    await updateDoc(doc(db,'users', user.uid),{
                        avatar:url,
                        avatarPath: snap.ref.fullPath
                    })

                    setImg("")
                    console.log(snap.ref.fullPath)
                    console.log(url)
                }
                catch (e) {
                   alert(e.message)
                }

            }
            uploadImg()

        }
    },[img, localUser, user.uid])

    const deleteImage = async()=>{
        try{
            const confirm = window.confirm("Delete Avatar?")
            if(confirm){
                await deleteObject(ref(storage,localUser.avatarPath))
                await updateDoc(doc(db,"users",user.uid),{
                    avatar:"",
                    avatarPath: ""
                })
            }
        }
        catch (e) {
            
        }
    }

    return localUser?(
        <section>
            <div className={"profile_container"}>
                <div className={"img_container"}>
                    <img src={`${localUser.avatar} || ${profilePic} `} alt={"Profile"} className={"avatar"}/>
                    <div className={"overlay"}>
                        <label htmlFor={"photo"}>
                            <img src={camera} className={"camera"} alt={"camera"}/>
                        </label>
                        {localUser.avatar? <img src={deletePic} className={"camera"} onClick={deleteImage}/> :null }
                        <input
                            type={"file"}
                            accept={"image/*"}
                            id={"photo"}
                            onChange={(e)=>setImg(e.target.files[0])}/>
                    </div>
                </div>
                <div className={"text_container"}>
                    <h3>{localUser.name}</h3>
                    <h3>{localUser.email}</h3>
                    <hr/>
                    <small>Joined on: {localUser.createdAt.toDate().toDateString()}</small>
                </div>
            </div>
        </section>
    ):null
    //toDate() convert firebase timeStamp to normal date then toDateString() prints it as a string
}