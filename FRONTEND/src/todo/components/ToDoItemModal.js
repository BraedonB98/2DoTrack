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
import './styling/ToDoItemModal.css';

const ToDoItemModal = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [timeDependent,setTimeDependent] = useState(false);
    const[addressDependent,setAddressDependent] = useState(false);
    const[recurringDependent,setRecurringDependent]=useState(false)
    const [category,setCategory]= useState(props.category())
    const [formState, inputHandler] = useForm({
      name: {
        value: '',
        isValid: false
      },
      priority: {
        value: 1,
        isValid: true
      },
      status: {
        value: 'Pending',
        isValid: true
      },
      ...(addressDependent) && {address: {
        value: '',
        isValid: false
      }},

      notes: {
        value: '',
        isValid: false
      },
      ...(recurringDependent) && {recurring: {
        value: {
            value:false,
            time:'',//days?
            category:'',
        },
        isValid: false
      }},
      ...(timeDependent) && {due: {
        value: {
            date:'',
            time:''
        },
        isValid: false
      }},


    },false);

    const handleError = error =>{
      props.onError(error);
    }
    const selectTimeHandler = event =>{
      event.preventDefault();
      setTimeDependent(timeDependent?false:true)
      setRecurringDependent(false);
    }
    const selectAddressHandler = event =>{
      event.preventDefault();
      setAddressDependent(addressDependent?false:true)
    }
    const recurringHandler = event =>{
      event.preventDefault();
      setRecurringDependent(recurringDependent?false:true)
    }

    const newToDoSubmitHandler = event =>{
        event.preventDefault();
        console.log("submitting");
        console.log(formState);
        props.submitted();//lets parent know its submitted 
    }
return(<React.Fragment>
    <Modal
      onCancel={props.onCancel}
      header={`${category.name} - New Task`}
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={props.onClear}>Cancel</Button>
          <Button type="submit" onClick = {newToDoSubmitHandler} disabled={!formState.isValid}> Submit </Button> </React.Fragment>}
    >
      <form id ="toDoItemModal__form" >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input id="name" element="input" type ="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler}/>
        <Input id="priority" element="input" type = "range" min="1" max ="5" validators={[VALIDATOR_REQUIRE()]} label={`Priority - ${formState.inputs.priority.value}`}  onInput={inputHandler} value ={formState.inputs.priority.value}/>
        <Button onClick = {selectTimeHandler} > {timeDependent?"Remove Date":"Set Date" }</Button>
        {(timeDependent) && <Input id="date" element="date" type = "date" label="Date"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a date if it is due."/>}
        {(timeDependent) && <Input id="time" element="time" type = "time" label="Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a time if it is due."/>}
        {(timeDependent) && <Button onClick = {recurringHandler} > {recurringDependent?"Stop Recurring":"Make Recurring" }</Button> }
        {(timeDependent && !recurringDependent) && <React.Fragment><br/><br/></React.Fragment>}
        {(recurringDependent) && <Input id="reccuring" element="time" type = "time" label="Recurring Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a recurring time."/>}
        <Button onClick = {selectAddressHandler} > {addressDependent?"Remove Address":"Set Address" }</Button>
        {(addressDependent) && <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler}/>}
        <Input id="notes" element="textarea" label="Notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler}/>
      </form>
    </Modal>
</React.Fragment>)
};

export default ToDoItemModal;