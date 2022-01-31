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
        return (
        <div className="todo-list center">
            <Card>
                <h2>No tasks found, Lets try creating one!</h2>
                <Button onClick = {props.onCreateTask}>Create Task</Button>
            </Card>
        </div>);
    }
    var priorities = [5,4,3,2,1];
    return (
        <ul className= "todo-list">
        {
        priorities.map(priority => {
            return(props.items.map( todo => {
                if(todo.priority === priority){
                    return (<ToDoItem 
                     _id={todo._id} 
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
                    onDeleteTask = {props.onDeleteTask}
                    onEditTask = {props.onEditTask} />)}
                else{
                    return("");
                }
            }))
        })    
        }
        
        
    </ul>
    );
}
export default ToDoList;
