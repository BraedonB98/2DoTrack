import React from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import CategoryToggle from "./CategoryToggle";
import Button from "../../shared/components/FormElements/Button"

//---------------------CSS----------------------------------
import "./styling/CategoriesList.css"



const CategoryList = props=> {
    if(props.categories.length === 0){
        console.log("no props provided in categories ist")
        return (
        <div className="categories-list center">
            <Card>
                <h2>No Categories found, Lets try creating one!</h2>
                <Button to = "/category/new">Create Category</Button>
            </Card>
        </div>);
    }

    return(
        <section className= "categories-list">
        {props.categories.map( category =>
         <CategoryToggle 
            _id={category._id} 
            key = {category._id}
            name={category.name} 
            icon = {category.icon}
            toDoList = {category.toDoList}
            onChangeCategory = {props.onChangeCategory} />)}
        </section>
    );
}
export default CategoryList;
