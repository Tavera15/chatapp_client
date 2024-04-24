import React from "react";
import "./ChatBubble.css";

function ChatBubble({user, message_username, message})
{
    return(
        <div className={`bubble mb-3 text-white ${user === message_username ? "self-message ms-5 bg-primary" : "me-5 bg-success"}`} >
            <p className="m-0 text-start">{message_username}: {message}</p>
        </div>
    );
}

export default ChatBubble;