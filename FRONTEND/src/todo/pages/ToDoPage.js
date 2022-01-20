import React,{ useContext}from "react";


import ToDoList from "../components/ToDoList";
//----------------------Context--------------------------------
import { AuthContext } from "../../shared/context/auth-context";

const ToDoPage = () => {
    const auth = useContext(AuthContext);

return(
    <div> 
        <h1>Todolist</h1>
        <ToDoList/>
    </div>
)}

export default ToDoPage;