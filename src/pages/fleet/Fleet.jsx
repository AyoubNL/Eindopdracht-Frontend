import './Fleet.css'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
function Fleet() {
    const {isAuth} = useContext(AuthContext)


    return (
        <div>Welkom {isAuth.user.username}</div>


    );
}

export default Fleet;