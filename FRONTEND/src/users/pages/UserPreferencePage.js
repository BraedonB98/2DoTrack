import React, { useContext, useState, useEffect } from "react";

import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import DashBoardItem from "../components/DashBoardItem";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AiFillEdit } from "react-icons/ai";
import DashBoardEditModal from "../components/DashBoardEditModal";

import "./styling/DashBoard.css";
import react from "react";

const UserPreferencePage = () => {
  return (
    <react.Fragment>
      <h1>User preferences</h1>
    </react.Fragment>
  );
};

export default UserPreferencePage;
