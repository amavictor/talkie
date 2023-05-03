import Moment from "react-moment";
import "./messageDisplay.scss"
import { useEffect, useRef } from "react";





export default function MessageDisplay({msg, currentUser}) {
    const scrollRef = useRef()
    //omo mehn weytin

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        //This is to scroll to the bottom (bascially just scrolling into view.
    }, [])
    const {from} = msg
    return(
        <>
            {
                from === currentUser

                ?
                    <div
                        className={"my-message"}
                        ref={scrollRef}
                    >
                        <div className={"mine"}>
                            <p>
                                {msg.media? <img src={msg.media} alt={msg.text}/> : null}
                                <br/>
                                {msg.text}
                                <br/>
                                <small>
                                    <Moment fromNow>{msg.sentAt.toDate()}</Moment>
                                </small>
                            </p>
                        </div>
                    </div>

                :

                    <div
                        className={"friend_message"}
                        ref={scrollRef}
                    >
                        <div className={"friend"}>
                            <p>
                                {msg.media? <img src={msg.media} alt={msg.text}/> : null}
                                <br/>
                                {msg.text}
                                <br/>
                                <small>
                                    <Moment fromNow>{msg.sentAt.toDate()}</Moment>
                                </small>
                            </p>

                        </div>
                    </div>

            }

        </>

    )
}