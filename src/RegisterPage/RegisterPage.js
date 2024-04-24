import React from "react";
import "./RegisterPage.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function RegisterPage({username, setUsername, room, setRoom})
{
    const navigate = useNavigate();

    function handleJoin(e)
    {
        e.preventDefault();
        
        if(username !== '' && room !== '')
        {
            navigate("/chat");
        }
    }

    return(
        <div className="container flex-col-wrap reg-page">
            <form className="flex-col-wrap p-4 text-center col-md-4 register-form" onSubmit={(e) => handleJoin(e)}>
                <h1 className="text-white">Chat App</h1>
                <div className="form-group mt-3">
                    <label className="form-label">Username</label>
                    <input required className="form-control text-center" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="form-group mt-3">
                    <label className="form-label">Room</label>
                    <input required className="form-control text-center" type="text" value={room} onChange={(e) => setRoom(e.target.value)}/>
                </div>

                <div className="mt-3">
                    <Button type="submit" className="btn ouline-info">Join</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;