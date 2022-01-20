import React,{ useContext}from "react";
import {NavLink} from 'react-router-dom';

import Button from "../../shared/components/FormElements/Button";

import { AuthContext } from "../../shared/context/auth-context";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    
    const login = () => {
        auth.login("Braedon");
    }
    

return(
    <div> 
        <h1>authpage</h1>
        <NavLink to ="/" exact><Button onClick = {login}>login</Button></NavLink>
        
    </div>
)}

export default AuthPage;