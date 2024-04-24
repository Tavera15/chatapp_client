import io from "socket.io-client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import RegisterPage from './RegisterPage/RegisterPage';
import ChatPage from './ChatPage/ChatPage';
import { useState } from 'react';
import PrivateRoute from "./PrivateRoute/PrivateRoute";
const socket = io.connect("http://localhost:4000");

function App() {
  

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");


  return (

    <div className="App">
      <Router>

        <Routes>

          <Route exact path='/' 
            element={
              <RegisterPage 
                username={username}
                setUsername={setUsername} 
                room={room} 
                setRoom={setRoom}
              />}>
          </Route>

          <Route exact path='/chat' 
            element={
              <PrivateRoute username={username} room={room}>
                <ChatPage 
                  socket={socket}
                  username={username}
                  room={room}
                  setUsername={setUsername}
                  setRoom={setRoom}
                />
              </PrivateRoute>
            }>
          </Route>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
