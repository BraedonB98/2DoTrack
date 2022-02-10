import React, { useState, useContext } from "react";

//-----------------------Components--------------------------
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";
import IconSelector from "../../shared/components/FormElements/IconSelector";
import Icon from "../../shared/components/UIElements/Icons";
//---------------------CSS----------------------------------
//import "./styling/NewCategory.css"

const NewCategory = (props) => {
  const auth = useContext(AuthContext);
  const uid = auth.UID;
  const [showIconSelect, setShowIconSelect] = useState();
  const [iconSelected, setIconSelected] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); //eslint-disable-line
  const [formState, inputHandler, setFormData] = useForm(
    {
      //eslint-disable-line
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const submitHandler = async () => {
    try {
      const newCategory = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/todo/createcategory`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          icon: iconSelected,
          uid: uid,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      props.onSubmit([newCategory.category]);
    } catch (err) {}
  };

  const handleIconSelect = (event, icon) => {
    setIconSelected(icon);
    setShowIconSelect(false);
  };

  return (
    <Card>
      <form id="toDoItemModal__form">
        <Input
          id="name"
          element="input"
          type="text"
          label="Category Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category name."
          onInput={inputHandler}
        />
        <Button
          onClick={(event) => {
            event.preventDefault();
            showIconSelect ? setShowIconSelect(false) : setShowIconSelect(true);
          }}
        >
          {showIconSelect ? "Cancel Select" : "Select Icon"}
        </Button>
        {iconSelected && <Icon name={iconSelected} />}
        {showIconSelect && (
          <IconSelector
            onCancel={() => {
              setShowIconSelect(false);
            }}
            onSelectedIcon={handleIconSelect}
          />
        )}
      </form>
      <Button onClick={props.onCancel}> Cancel </Button>
      <Button
        type="submit"
        onClick={submitHandler}
        disabled={!formState.isValid || !iconSelected}
      >
        {" "}
        Submit{" "}
      </Button>
    </Card>
  );
};
export default NewCategory;
