import React, { useState, useEffect } from "react";
import Card from "../../shared/components/UIElements/Card";

import "./styling/UserSearchItem.css";

const UserSearchItem = (props) => {
  const [className, setClassName] = useState();
  useEffect(() => {
    setClassName(props.className);
  }, [props.className]);
  return (
    <Card
      className={`user-search-item ${className}`}
      onClick={(event) => {
        event.target.value = {
          _id: props._id,
          name: props.name,
          imageUrl: props.imageUrl,
        };
        props.onSelectedUser(event);
      }}
    >
      <img
        className="user-search-item__image"
        src={`${process.env.REACT_APP_ASSET_URL}/${props.imageUrl}`}
        alt={`${props.name}`}
      />
      <h2 className="user-search-item__name">{props.name}</h2>
    </Card>
  );
};

export default UserSearchItem;
