import React, { useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

const DashBoardEditModal = (props) => {
  const [columnSlider, setColumnSlider] = useState([]);

  const columnSliderHandler = (event) => {
    console.log(event.target.value);
    let newArray = [];
    for (let i = 0; i < event.target.value; i++) {
      newArray.push(1);
    }
    setColumnSlider(newArray);
    console.log(columnSlider);
  };

  return (
    <Modal
      onCancel={props.onClear}
      header="DashBoard Layout"
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={props.open}
    >
      <div>
        <input
          type="range"
          min="1"
          max="5"
          value={columnSlider.length}
          onChange={columnSliderHandler}
        />
      </div>
      <div>
        {columnSlider.map((row) => {
          return (
            <select name="rows">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          );
        })}
      </div>
    </Modal>
  );
};

export default DashBoardEditModal;
