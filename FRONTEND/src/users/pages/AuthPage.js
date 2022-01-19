import React,{useContext}from "react";
import { AuthContext } from "../../shared/context/auth-context";

const AuthPage = props => {
    const auth = useContext(AuthContext);
    auth.login(true);

return(
<h1>
    authpage
</h1>)
}

export default AuthPage;