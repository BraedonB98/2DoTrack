import React, {useState, useEffect, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import SwipeableHook from "../../shared/hooks/gesture-hook"

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ToDoItemModal from "../components/ToDoItemModal";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import {AuthContext} from "../../shared/context/auth-context";
import NewCategory from "../components/NewCategory";
import CategoryEditor from "../components/CategoryEditor";
import Icon from "../../shared/components/UIElements/Icons";


import ToDoList from "../components/ToDoList";
import CategoryList from "../components/CategoriesList";

import "./styling/ToDoPage.css"

const ToDoPage = () => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();
    const [taskModal, setTaskModal] = useState(false);
    const [loadedTasks, setLoadedTasks] = useState([]);
    const [loadedCategory, setLoadedCategory] = useState();
    const[loadedCategories,setLoadedCategories]= useState();
    const[editTask,setEditTask]= useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [categoryEditor, setCategoryEditor] = useState(false);
    const auth= useContext(AuthContext);
    const UID = auth.UID;

    useEffect( ()=>{
        const fetchCategories = async ()=>{
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/categories/${auth.UID}`,'GET',null,{'Authorization':`Bearer ${auth.token}`});
                setLoadedCategories(responseData.categories);
                setLoadedCategory(responseData.categories[0]);
              }
              catch(err){}
          };
        fetchCategories();
    },[sendRequest,auth])

    useEffect (()=>{ //when submitting the 2doitem modal, it reloads modal if loadedTasks changes but if setTaskModalCHanges first it doesnt update loadedTasks
        setTaskModal(false);
        setEditTask(false);
    },[loadedTasks])

    useEffect( ()=>{
        setNewCategory(false)
        setCategoryEditor(false)
        const fetchTasks = async ()=>{
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/getItems/${auth.UID}/${loadedCategory.name}`,'GET',null,{'Authorization':`Bearer ${auth.token}`});
                setLoadedTasks(responseData.items);
              }
              catch(err){}
      
          };
        fetchTasks();
    },[sendRequest, auth,loadedCategory])


    const taskDeletedHandler = (deletedTaskId) => {
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
        
        if(loadedCategory._id!==newCategory._id)
        {setLoadedCategory(newCategory)}
        
    }
    const toggleRight = () =>{
        const currentCatIndex = loadedCategories.findIndex(cat => cat.name===loadedCategory.name);
        if(loadedCategories[currentCatIndex+1]){
            setLoadedCategory(loadedCategories[currentCatIndex+1])
        }
    }
    const toggleLeft = () =>{
        const currentCatIndex = loadedCategories.findIndex(cat => cat.name===loadedCategory.name);
        if(loadedCategories[currentCatIndex-1]){
            setLoadedCategory(loadedCategories[currentCatIndex-1])
        }
    }
    const handleEditTask = editTaskId => {
        setEditTask(editTaskId);
        setTaskModal(true);
    }
    const handleNewTask = () => {
        setEditTask(false);
        setTaskModal(true);
    }
    const handleTaskModalError = error => {
        console.log(error)
    }
    const submitEditHandler = editedTask =>{
        setLoadedTasks(loadedTasks.map(task => {
            if(task._id === editedTask._id.toString())
            {
                return(editedTask);
            }
            else{
                return(task)
            }
        }))
    }
    const submitNewHandler = newTask =>{
        setLoadedTasks(newTask.concat(loadedTasks));
    }
    
    const handleCategoryEditor = () =>{
        categoryEditor?setCategoryEditor(false):setCategoryEditor(true);
        newCategory&& setNewCategory(false);
    }
    const handleNewCategory = () => {
        newCategory?setNewCategory(false):setNewCategory(true);
        CategoryEditor&& setCategoryEditor(false);
    }
    const editCategoryHandler = newCategory => {
        setLoadedCategories(loadedCategories.map(category => {
            if(category._id === newCategory._id)
            {
                return(newCategory);
            }
            else{
                return(category);
            }
        }))

        setLoadedCategory (newCategory);
    }
    const deleteCategoryHandler = deletedCategory => {
        const currentCatIndex = loadedCategories.findIndex(cat => cat.name===loadedCategory.name);
        if(loadedCategories[currentCatIndex-1]){
            setLoadedCategory(loadedCategories[currentCatIndex-1])
        }
        else if(loadedCategories[currentCatIndex+1]){
            setLoadedCategory(loadedCategories[currentCatIndex+1])
        }
        else {
            //No Loaded Categories handling
        }
        setLoadedCategories(loadedCategories.filter(category => category._id !== deletedCategory._id))
    }
    const newCategorySubmitHandler = newCategory => {
        setLoadedCategories(loadedCategories.concat(newCategory));
        setLoadedCategory(newCategory[0]);
    }
    const handleTaskAccepted = task =>{
        console.log(loadedTasks.concat(task))
        setLoadedTasks(loadedTasks.concat(task))
    }

return(
<React.Fragment>
    <ErrorModal error = {error} onClear={clearError}/>
    {(!isLoading && loadedCategory && loadedTasks )&& <ToDoItemModal category = {loadedCategory} open={taskModal} taskId = {editTask}  submitted= {task=>{ (editTask?submitEditHandler(task):submitNewHandler(task))}} onError = {handleTaskModalError} onClear={()=>{setTaskModal(false); setEditTask();}}  />}
    <SwipeableHook className ="todo-page__contents" onSwipedLeft = {toggleRight}  onSwipedRight = {toggleLeft}>{/*This is a div but swipeable events*/}
        {isLoading&&<div className = "center"><LoadingSpinner/></div>}
        {(!isLoading && loadedCategories) && <CategoryList onChangeCategory={changeLoadedCategoryHandler} categories= {loadedCategories}/> }
         {(!isLoading && loadedCategory) && 
            <div className="todo-page__header">
                <Button className = "todo-page__new-category-button"   onClick={handleNewCategory}>New Category</Button>
                <div className="todo-page__category-header">
                    <Button className = "todo-page__arrow-item-button"  onClick={toggleLeft}>&lt;</Button>
                    <Button className = "todo-page__current-category-header"  onClick={handleCategoryEditor}><Icon name={loadedCategory.icon}/> {loadedCategory.name} <Icon name={loadedCategory.icon}/></Button>
                    <Button className = "todo-page__arrow-item-button"  onClick={toggleRight}> &gt;</Button>
                </div>
                <Button className = "todo-page__new-to-do-item-button"  onClick={handleNewTask}>New Task</Button>
            </div> }
           
            {(!isLoading && newCategory ) && <NewCategory onCancel={()=>{setNewCategory(false)}} onSubmit = {newCategorySubmitHandler}/> }
            {(!isLoading && categoryEditor && loadedCategory ) && <CategoryEditor onTaskAccepted = {handleTaskAccepted}onDelete= {deleteCategoryHandler} onEdit = {editCategoryHandler}category = {loadedCategory}/>}
           
            

        <div className="todo-page__task-list">
            {(!isLoading && loadedTasks) && <ToDoList onCreateTask = {handleNewTask} items={loadedTasks} onStatusChange = {taskStatusChangeHandler} onDeleteTask={taskDeletedHandler} onEditTask={handleEditTask} />}
        </div>
    </SwipeableHook>
</React.Fragment>
)}

export default ToDoPage;
