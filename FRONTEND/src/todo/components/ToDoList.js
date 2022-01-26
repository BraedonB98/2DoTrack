import React from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import ToDoItem from "./ToDoItem";
import Button from "../../shared/components/FormElements/Button"

//---------------------CSS----------------------------------
import "./styling/ToDoList.css"



const ToDoList = props=> {
    //props.items=DUMMYITEMS;
    //DUMMYITEMS = [];
    if(props.items.length === 0){
        console.log("no items in props todo list")
        return (
        <div className="todo-list center">
            <Card>
                <h2>No tasks found, Lets try creating one!</h2>
                <Button to = "/todo/new">Create Task</Button>
            </Card>
        </div>);
    }

    return(
        <ul className= "todo-list">
        {props.items.map( todo =>
         <ToDoItem 
            id={todo._id} 
            name={todo.name} 
            status={todo.status} 
            priority = {todo.priority}
            due ={todo.due}
            creator={todo.creator}
            address = {todo.address}
            coordinates = {todo.location}
            notes = {todo.notes}
            users = {todo.users}
            onStatusChange ={props.onStatusChange}
            onDeleteTask = {props.onDeleteTask} />)}
    </ul>
    );
}
export default ToDoList;
