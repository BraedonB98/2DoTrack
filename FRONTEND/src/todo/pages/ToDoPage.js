import React, {useState, useEffect, useContext , useCallback} from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {AuthContext} from "../../shared/context/auth-context";

import ToDoList from "../components/ToDoList";
import CategoryList from "../components/CategoriesList";




const ToDoPage = () => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();
    const [loadedTasks, setLoadedTasks] = useState();
    const [loadedCategory, setLoadedCategory] = useState();
    const[loadedCategories,setLoadedCategories]= useState();
    const auth= useContext(AuthContext);
    const UID = auth.UID;

    useEffect( ()=>{
        const fetchCategories = async ()=>{
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/todo/categories/${UID}`);
                setLoadedCategories(responseData.categories);
                setLoadedCategory(responseData.categories[0]);
              }
              catch(err){}
          };
        fetchCategories();
    },[UID])

    useEffect( ()=>{
        const fetchTasks = async ()=>{
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/todo/getItems/${UID}/${loadedCategory.name}`);
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

    const taskStatusChangeHandler = (tid,status) => {
        console.log("changing status")
        setLoadedTasks(loadedTasks.map( task =>
            {
                console.log(task._id)
                if(task._id === tid ){
                    task.status = status;
                }
                return (task);
            }
        ));
    }

    const changeLoadedCategoryHandler = async(newCategory) =>{
        if(loadedCategory.name!==newCategory.name)
        {setLoadedCategory(newCategory)}
        
    }



return(
    <React.Fragment>
            <ErrorModal error = {error} onClear={clearError}/>
            {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}

            {!isLoading&& loadedCategories && <CategoryList onChangeCategory={changeLoadedCategoryHandler} categories= {loadedCategories}/> }
            {!isLoading&& loadedCategories && <h1>{loadedCategory.name}</h1> }
            {!isLoading&& loadedTasks && <ToDoList items={loadedTasks} onStatusChange = {taskStatusChangeHandler} onDeleteTask={taskDeletedHandler} />}
        </React.Fragment>
    
)}

export default ToDoPage;
