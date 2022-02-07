import React, { useState } from "react";

//-----------------------Components--------------------------
import Card from "../../shared/components/UIElements/Card";
import UserSearchItem from "./UserSearchItem";

//---------------------CSS----------------------------------
import "./styling/UserSearchList.css";

const UserSearchList = (props) => {
  const [selectedUser, setSelectedUser] = useState();
  if (props.users.length === 0) {
    return (
      <div className="user-search-list center">
        <Card>
          <h2>No users found, double check their username</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="user-search-list">
      {props.users.map((user) => (
        <UserSearchItem
          _id={user._id.toString()}
          key={user._id.toString()}
          className={
            user._id.toString() === selectedUser
              ? "user-search-item__selected-item"
              : ""
          }
          name={user.name}
          imageUrl={user.imageUrl}
          onSelectedUser={(event) => {
            setSelectedUser(event.target.value._id);
            props.onSelectedUser(event);
          }}
        />
      ))}
    </ul>
  );
};
export default UserSearchList;
