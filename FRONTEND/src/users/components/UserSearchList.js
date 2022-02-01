import React from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import UserSearchItem from "./UserSearchItem";

//---------------------CSS----------------------------------
import "./styling/UserSearchList.css"



const UserSearchList = props=> {
    if(props.users.length === 0){
        return (
        <div className="user-search-list center">
            <Card>
                <h2>No users found, double check their username</h2>
            </Card>
        </div>);
    }
    return (
        <ul className= "user-search-list">
        {
        props.users.map( user => 
            <UserSearchItem 
            _id={user._id} 
            key={user._id}
            name={user.name} 
            imageUrl={user.imageUrl} 
            onSelectedUser = {props.onSelectedUser} />)}
            </ul>
            );
        }
        export default UserSearchList;