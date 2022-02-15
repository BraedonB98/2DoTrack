import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./styling/UserDropDown.css";

const UserDropDown = (props) => {
  const auth = useContext(AuthContext); // onClick={auth.logout}
  return <h1></h1>;
};

export default UserDropDown;
