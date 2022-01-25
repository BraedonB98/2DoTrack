import React, {useState, useEffect, useContext} from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {AuthContext} from "../../shared/context/auth-context";

import ToDoList from "../components/ToDoList";




const ToDoPage = () => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();
    const [loadedTasks, setLoadedTasks] = useState();
    const [loadedCategory, setLoadedCategory] = useState();
    const auth= useContext(AuthContext);
    const UID = auth.UID;


    useEffect( ()=>{
        const fetchTasks = async ()=>{
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/todo/getItems/${UID}/Home`);
                setLoadedTasks(responseData.items);
              }
              catch(err){}
      
          };
        fetchTasks();
    },[sendRequest, UID,loadedCategory])

    const taskDeletedHandler = (deletedTaskId) => {
        console.log("deleting")
        setLoadedTasks(prevTasks => prevTasks.filter(task => task._id !== deletedTaskId));
    };



return(
    <React.Fragment>
            <ErrorModal error = {error} onClear={clearError}/>
            {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}
            {!isLoading&& loadedTasks && <ToDoList items={loadedTasks} onDeleteTask={taskDeletedHandler} />}
        </React.Fragment>
    
)}

export default ToDoPage;
