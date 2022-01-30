import React, {useState, useContext} from 'react';

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button"
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/components/FormElements/Input';
import IconSelector from '../../shared/components/FormElements/IconSelector';
//---------------------CSS----------------------------------
//import "./styling/NewCategory.css"



const NewCategory = props=> {
    const auth = useContext(AuthContext);
    const uid = auth.UID;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
        name: {
          value: '',
          isValid: false
        },
      },false);
      const submitHandler = () =>{

      }
    return(
        <Card>
            <form id ="toDoItemModal__form" >
                <Input id="name" element="input" type ="text" label="Category Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid category name." onInput={inputHandler}/>
                <IconSelector/>
            </form>
            <Button type="submit" onClick = {submitHandler} disabled={!formState.isValid}> Submit </Button>
        </Card>
    );
}
export default NewCategory;
