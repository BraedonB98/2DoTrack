import React from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import ToDoItem from "./ToDoItem";

//---------------------CSS----------------------------------
import "./styling/PendingTaskList.css"



const PendingItemList = props=> {
    //props.items=DUMMYITEMS;
    //DUMMYITEMS = [];
    if(props.items.length === 0){
        return (
        <div className="todo-list center">
            <Card>
                <h2>No tasks waiting to be accepted</h2>
            </Card>
        </div>);
    }
    return (
        <ul className= "pending-task-list">
        {
            
        props.items.map( todo => 
            <ToDoItem 
            _id={todo._id} 
            key={todo._id}
            name={todo.name} 
            status={todo.status} 
            priority = {todo.priority}
            due ={todo.due}
            creator={todo.creator}
            address = {todo.address}
            location = {todo.location}
            notes = {todo.notes}
            users = {todo.users}
            onDismissTask = {props.onDismissTask}
            onPendingSubmit = {props.onPendingSubmit}
            pending = {true} />)}
            </ul>
            );
        }
        export default PendingItemList;