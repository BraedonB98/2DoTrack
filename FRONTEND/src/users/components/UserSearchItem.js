import React,{ useState}from "react";
import Card from '../../shared/components/UIElements/Card'

import "./styling/UserSearchItem.css"

const UserSearchItem = props => {

    return(
        <Card onClick = {event =>{event.target.value = props._id;props.onSelectedUser(event);}} className = "user-search-item"> 
            <img className="user-search-item__image" src={`http://localhost:5000/${props.imageUrl}`} alt = {`${props.name}`}/>
            <h2 className="user-search-item__name">{props.name}</h2>
        </Card>
    )
}

export default UserSearchItem