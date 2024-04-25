import React from "react";
import io from "socket.io-client";

export const socket = io.connect(process.env.REACT_APP_SERVER,
{
    cors:{
        origin: process.env.REACT_APP_SERVER,
        credentials: true
    },
    transports: ["polling"]
});

export const SocketContext = React.createContext();