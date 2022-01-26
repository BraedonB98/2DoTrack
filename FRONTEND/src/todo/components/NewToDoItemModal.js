import React, {useEffect , useState, useContext} from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from  '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './styling/NewToDoItemModal.css';

const NewToDoItemModal = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    
    const [formState, inputHandler] = useForm({
      category: {
        value: props.category,
        isValid: true//!--------------------Need to make it so props.category isnt undef
      },
      name: {
        value: '',
        isValid: false
      },
      status: {
        value: 'Pending',
        isValid: true
      },
      address: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: true
      },
      notes: {
        value: '',
        isValid: false
      },
      recurring: {
        value: {
            value:false,
            time:'',//days?
            category:'',
        },
        isValid: false
      },
      due: {
        value: {
            date:'',
            time:''
        },
        isValid: false
      },
    },false);

    const handleError = error =>{
      props.onError(error);
    }

    const newToDoSubmitHandler = event =>{
        event.preventDefault();
        console.log("submitting");
        props.submitted();//lets parent know its submitted 
    }
return(<React.Fragment>
    <Modal
      onCancel={props.onCancel}
      header={`New Task - ${props.category}`}
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={props.onClear}>Cancel</Button>
          <Button onClick={newToDoSubmitHandler}>Submit</Button> </React.Fragment>}
    >
      <form className ="place-form" onSubmit = {newToDoSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input id="name" element="input" type ="text" label="name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler}/>
        {/*//!----------- will need to be made into a Input that sets validity */
        }
        <Input id="address" element="input" type = "range" min="1" max ="5" label="range" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler}/>
        
        <Input id="address" element="input" label="address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler}/>
        <Input id="notes" element="textarea" label="notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler}/>
        <Button type="submit" disabled={!formState.isValid}> Submit </Button>
      </form>
    </Modal>
</React.Fragment>)
};

export default NewToDoItemModal;