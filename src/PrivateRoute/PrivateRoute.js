import { Navigate } from "react-router-dom";

function PrivateRoute({username, room, children})
{
    return(
        username !== "" && room !== "" ? children : <Navigate to="/" />
    );
}

export default PrivateRoute;