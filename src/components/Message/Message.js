import Upload from "../../assets/uploading.png"
import "./Message.scss"

export default function Message (){
    return (
        <form className={"message_form"}>
            <label htmlFor={"img"}>
                <img src={Upload} alt={"image_upload"} className={"up"}/>
            </label>
            <input type={"file"} id={"img"} accept={"image/*"} style={{display:"none"}}/>
            <div>
                <input type={"text"} placeholder={"Enter message"}/>
            </div>
            <div>
                <button className={"btn"}>Send</button>
            </div>

        </form>
    )
}