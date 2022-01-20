import React from "react";

import Card from '../../shared/components/UIElements/Card';
import ToDoItem from "./ToDoItem";
import Button from "../../shared/components/FormElements/Button"


const DUMMYITEMS = [{id: "task1", 
    task: "Create the dummy items",
    complete: "Pending",
    due: null,
    UID: "Braedon",
    address: "2468 S. Marion St Denver CO",
    coordinates: {},
    notes : "This is going to be a big project probably should use a dummy place to test"},
    {id: "task2", 
    task: "Create another",
    complete: "Complete",
    due: null,
    UID: "Braedon",
    address: "2468 S. Marion St Denver CO",
    coordinates: {},
    notes : "This is going to be a big project probably should use a dummy place to test"}]

const ToDoList = props=> {
    //props.items=DUMMYITEMS;
    if(DUMMYITEMS.length === 0){
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
        {DUMMYITEMS.map( todo =>
         <ToDoItem 
            id={todo.id} 
            task={todo.task} 
            complete={todo.complete} 
            due ={todo.due}
            UID={todo.UID}
            address = {todo.address}
            coordinates = {todo.location}
            notes = {todo.notes}
            onDelete = {todo.onDeletePlace} />)}
    </ul>
    );
}
export default ToDoList;
