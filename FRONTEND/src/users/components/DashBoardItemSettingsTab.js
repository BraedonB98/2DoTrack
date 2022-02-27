import React, { useState } from "react";

//-----------------------Components--------------------------
import DropDownItem from "../../shared/components/UIElements/DropDownItem";
import DropDownMenu from "../../shared/components/UIElements/DropDownMenu";
//---------------------CSS----------------------------------
import "./styling/DashBoardItem.css";
import react from "react";

const DashBoardItemSettingsTab = (props) => {
  const insertColumnHandler = (event) => {};
  const insertRowHandler = (event) => {};

  return (
    <DropDownMenu>
      <DropDownItem onClick={insertColumnHandler}>InsertColumn</DropDownItem>
      <DropDownItem onClick={insertRowHandler}>InsertRow</DropDownItem>
    </DropDownMenu>
  );
};

export default DashBoardItemSettingsTab;
