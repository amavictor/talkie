import Upload from "../../assets/uploading.png"
import "./Message.scss"

export default function Message ({handleSubmit, text,setText,setImg}){
    return (
        <form className={"message_form"} onSubmit={handleSubmit}>
            <label htmlFor={"img"}>
                <img src={Upload} alt={"image_upload"} className={"up"}/>
            </label>
            <input
                onChange={(e)=>setImg(e.target.files[0])}
                type={"file"}
                id={"img"}
                accept={"image/*"}
                style={{display:"none"}}/>
            <div>
                <input
                    type={"text"}
                    placeholder={"Enter message"}
                    value={text}
                    onChange={(e=> setText(e.target.value))}/>
            </div>
            <div>
                <button className={"btn"}>Send</button>
            </div>

        </form>
    )
}