import React from "react";

import { useParams } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import ToDoList from "../components/ToDoList";




const ToDoPage = () => {
    

return(
    <div> 
        <h1>Todolist</h1>
        <ToDoList/>
    </div>
)}

export default ToDoPage;