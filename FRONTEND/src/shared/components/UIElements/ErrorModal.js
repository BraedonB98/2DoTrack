import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

import "./styling/ErrorModal.css";
const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      error={true}
      header="An Error Occurred!"
      show={!!props.error}
      className="error-modal"
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
