import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./ChatPage.css";
import ChatBubble from "../Components/ChatBubble/ChatBubble";
import { Button } from "react-bootstrap";

function ChatPage({socket, username, room, setUsername, setRoom})
{
    const [message_sent, setMessage_sent] = useState("");

    const [all_messages, setAllMessages] = useState([]);


    function handleSend(e)
    {
        e.preventDefault();
        setAllMessages(oldArr => [...oldArr, {username: username, message: message_sent}]);
        socket.emit("message_sent", {username, room, message_sent});
        setMessage_sent("");
    }

    function handleLogout(e)
    {
        e.preventDefault();
        setUsername("");
        setRoom("");
        socket.emit("self_logout", {username, room});
    }

    useEffect(() => {
        socket.on("friend_logout", (data) => {
            setAllMessages(oldArr => [...oldArr, {username: data.username, message: data.message}])
        });
    }, [socket]);

    // Notify room that self user joined
    useEffect(() => {
        socket.emit("self_joined", {username, room});
    }, [socket, username, room]);

    // Listen to when new user joins room
    useEffect(() => {
        socket.on("friend_joined", (data) => {
            setAllMessages(oldArr => [...oldArr, {username: data.username, message: data.message}])
        })

    },[socket]);

    // Listen to when room receives messages
    useEffect(() => {
        socket.on("message_receive", (data) => {
            setAllMessages(oldArr => [...oldArr, {username: data.username, message: data.message}])
        })
    }, [socket])

    // Scroll all the way down when message is sent or received
    useEffect(() => {
        let x = document.getElementsByClassName("chat-messages")[0];
        x.scrollTo(0,x.scrollHeight);
    }, [all_messages])

    return(
        <div>
            <Navbar className="bg-body-tertiary">
            <Container>
                    <Navbar.Text className="navbar-brand">Signed in as {username}</Navbar.Text>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="link" className="navbar-text" onClick={(e) => handleLogout(e)}>Log Out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="ps-2 pe-2">
                <div className="container p-3 mt-2 col-md-10 col-lg-6 chat-box">
                    <h1 className="text-white">{room}</h1>
                    <div className="p-2 chat-messages">

                        {
                            all_messages.map((m, i) => {
                                return <ChatBubble user={username} message_username={m.username} message={m.message} key={i}/>
                            })
                        }

                    </div>

                    <div className=" text-controls">
                        <textarea rows={2} className="form-control" placeholder="text" value={message_sent} onChange={(e) => setMessage_sent(e.target.value)} />
                        <Button className="badge badge-pill badge-primary" onClick={(e) => handleSend(e)}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;