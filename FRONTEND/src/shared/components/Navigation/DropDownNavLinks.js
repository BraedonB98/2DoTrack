import React, {useContext} from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from 'react-router-dom'


const DropDownNavLinks = props => {
    const auth = useContext(AuthContext);
    console.log(auth.UID)
    return(
        <button onClick = {auth.logout}>LOGOUT</button>     
    )
}

export default DropDownNavLinks;