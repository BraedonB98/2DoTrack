import React from "react";
import { NavLink } from 'react-router-dom'

import './NavLinks.css';

const NavLinks = props => {
    console.log("navlinks");
    
    return (
        <ul className = "nav-links">
            <li>
                <NavLink to ="/" exact>HOME</NavLink>
            </li>
            <li>
                <NavLink to = {`/Services`}>Services</NavLink>
            </li>
            <li>
                <NavLink to = {`/About`}> About Us </NavLink>
            </li>
            <li>
                <NavLink to = {`/Contact`}> Contact Us </NavLink>
            </li>
            <li>
                <NavLink to = {`/NewPatient`}> New Patient </NavLink>
            </li>

        </ul>
    )
}

export default NavLinks;