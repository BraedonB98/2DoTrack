import React, {useState, useEffect, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import SwipeableHook from "../../shared/hooks/gesture-hook"

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import NewToDoItemModal from "../components/NewToDoItemModal";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import {AuthContext} from "../../shared/context/auth-context";

import ToDoList from "../components/ToDoList";
import CategoryList from "../components/CategoriesList";

import "./styling/ToDoPage.css"

const ToDoPage = () => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();
    const [newTask, setNewTask] = useState(true);
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
        fetchCategories();// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
    const leftSwipe = () =>{
        const currentCatIndex = loadedCategories.findIndex(cat => cat.name===loadedCategory.name);
        if(loadedCategories[currentCatIndex+1]){
            setLoadedCategory(loadedCategories[currentCatIndex+1])
        }
    }
    const rightSwipe = () =>{
        const currentCatIndex = loadedCategories.findIndex(cat => cat.name===loadedCategory.name);
        if(loadedCategories[currentCatIndex-1]){
            setLoadedCategory(loadedCategories[currentCatIndex-1])
        }
    }
    


return(
    <React.Fragment>
            <ErrorModal error = {error} onClear={clearError}/>
            <NewToDoItemModal open={newTask} onClear={()=>{setNewTask(false)}} />
            <SwipeableHook onSwipedLeft = {leftSwipe}  onSwipedRight = {rightSwipe}>{/*This is a div but swipeable events*/}
            {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}
            
                {(!isLoading && loadedCategories) && <CategoryList onChangeCategory={changeLoadedCategoryHandler} categories= {loadedCategories}/> }
            
            <div>
                {(!isLoading && loadedCategory) && 
                    <h1>{loadedCategory.name}
                        <Button className = "todo-page__new-to-do-item-button" category = {loadedCategory.name} onClick={()=>{setNewTask(true)}}>+</Button>
                    </h1> }
                {(!isLoading && loadedTasks) && <ToDoList items={loadedTasks} onStatusChange = {taskStatusChangeHandler} onDeleteTask={taskDeletedHandler} />}
            </div>
            </SwipeableHook>
        </React.Fragment>
    
)}

export default ToDoPage;
