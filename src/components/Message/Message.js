import "./Message.scss"
import { Input } from "../Input/input"
import Send from "../../assets/send.png"
import Photo from "../../assets/photo.png"

export default function Message({ handleSubmit, text, setText, setImg, img }) {
    const hanldeKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of Enter key
            setText(text + "\n"); // Add a new line character to the input value
        }
    }
    return (
        <form className={"message_form"} onSubmit={handleSubmit}>
            <label htmlFor={"img"}>
                <img src={Photo} alt={"image_upload"} className={"upload"} />
                {
                    img && <div className="image_true" />
                }
            </label>
            <input
                onChange={(e) => setImg(e.target.files[0])}
                type={"file"}
                id={"img"}
                accept={"image/*"}
                style={{ display: "none" }}
                multiple={true}
            />
            <div className="input_send">
                <Input
                    type={"text"}
                    placeholder={"Enter message"}
                    value={text}
                    onChange={(e => setText(e.target.value))}
                    onKeyDown={hanldeKeyDown}
                />
                <div>
                    <button className={"btn"}>
                        <img src={Send} alt="send-message" />
                    </button>
                </div>
            </div>

        </form>
    )
}