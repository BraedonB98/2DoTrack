import React, {useContext} from "react";
import { NavLink } from 'react-router-dom'

import DropdownNavLinks from "./DropDownNavLinks";

import { AuthContext } from "../../context/auth-context";

import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    
    return (
        <ul className = "nav-links">
            <li>
                <NavLink to ="/" exact>{auth.isLoggedIn? "DashBoard" : "Home" }</NavLink>
            </li>
            {!auth.isLoggedIn && ( <li><NavLink to ="/auth" exact>Login</NavLink></li>)}


            {auth.isLoggedIn && (<li> <NavLink to ="/todo" exact>ToDo</NavLink> </li>)}
            {auth.isLoggedIn && (<li> <NavLink to ="/finance" exact>Finance</NavLink> </li>)}
            {auth.isLoggedIn && (<li> <DropdownNavLinks/></li>)}
        </ul>
    )
}

export default NavLinks;