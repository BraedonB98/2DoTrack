import React from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import CategoryToggle from "./CategoryToggle";
import Button from "../../shared/components/FormElements/Button"

//---------------------CSS----------------------------------
import "./CategoriesList.css"



const CategoryList = props=> {
    //props.items=DUMMYITEMS;
    //DUMMYITEMS = [];
    if(props.categories.length === 0){
        console.log("no props provided in categories ist")
        return (
        <div className="todo-list center">
            <Card>
                <h2>No Categories found, Lets try creating one!</h2>
                <Button to = "/category/new">Create Category</Button>
            </Card>
        </div>);
    }

    return(
        <ul className= "category-list">
        {props.categories.map( category =>
         <CategoryToggle 
            id={category._id} 
            name={category.name} 
            icon = {category.icon}
            toDoList = {category.toDoList}
            onChangeCategory = {props.onChangeCategory} />)}
    </ul>
    );
}
export default CategoryList;
