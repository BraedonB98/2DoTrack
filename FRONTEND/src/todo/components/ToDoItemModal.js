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
    const[loadedItem,setLoadedItem]= useState()
    
    const [formState, inputHandler, setFormData] = useForm({
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
    useEffect( ()=>{
      const fetchItem = async ()=>{
          try {
              const responseData = await sendRequest(`http://localhost:5000/api/todo/getitem/${props.taskId}`); //super annoying here because the HTTP function uses useCallback so it wont let me call it if it is the same item 2 times in a row
              console.log(responseData.task);
              setLoadedItem(responseData.task);
              console.log(loadedItem);
              setFormData({
                  name: {
                      value: responseData.task.name,
                      isValid: true
                    },
                    priority: {
                      value: responseData.task.priority,
                      isValid: true
                    },
                    status: {
                      value: responseData.task.status,
                      isValid: true
                    },
                    ...(responseData.address) && {address: {
                      value: responseData.address,
                      isValid: true
                    }},
                    notes: {
                      value: responseData.task.notes,
                      isValid: true
                    },
                    ...(responseData.due) && {due: {
                      value: {
                          date:responseData.due.date,
                          time:responseData.due.time
                      },
                      isValid: true
                    }},
              },true);
            }
            catch(err){
              console.log(err)
              handleError(err);
            }
            
        };
      if(!props.newItem){fetchItem();}
      
  },[sendRequest,setFormData,props.taskId])//eslint-disable-line

  
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

    const editToDoSubmitHandler = event =>{
        event.preventDefault();
        console.log("editing");
        console.log(formState);
        props.submitted();//lets parent know its submitted 
    }

    const newToDoSubmitHandler = event =>{
        event.preventDefault();
        console.log("creating");
        console.log(formState);
        props.submitted();//lets parent know its submitted 
    }
return(<React.Fragment>
    {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}
    
    {(!isLoading && loadedItem) &&  <Modal
      onCancel={() => {setLoadedItem(); props.onCancel();}} 
      header={`${props.category.name} - ${(!props.newItem)? `Editing "${loadedItem.name}"`:"New Task" }`} 
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={props.onClear}>Cancel</Button>
          <Button type="submit" onClick = {props.newItem?newToDoSubmitHandler:editToDoSubmitHandler} disabled={!formState.isValid}> Submit </Button> </React.Fragment>}
    >
      <form id ="toDoItemModal__form" >
        <Input id="name" element="input" type ="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler} initialValue = {props.newItem?"": loadedItem.name}/>
        <Input id="priority" element="input" type = "range" min="1" max ="5" validators={[VALIDATOR_REQUIRE()]} label={`Priority - ${formState.inputs.priority.value}`}  onInput={inputHandler} initialValue = {props.newItem?"": loadedItem.priority}/>
        <Button onClick = {selectTimeHandler} > {timeDependent?"Remove Date":"Set Date" }</Button>
        {(timeDependent) && <Input id="date" element="date" type = "date" label="Date"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a date if it is due." initialValue = {(props.newItem && loadedItem.due)?"": loadedItem.due.date}/> }
        {(timeDependent) && <Input id="time" element="time" type = "time" label="Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a time if it is due."/>}
        {(timeDependent) && <Button onClick = {recurringHandler} > {recurringDependent?"Stop Recurring":"Make Recurring" }</Button> }
        {(timeDependent && !recurringDependent) && <React.Fragment><br/><br/></React.Fragment>}
        {(recurringDependent) && <Input id="reccuring" element="time" type = "time" label="Recurring Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a recurring time."/>}
        <Button onClick = {selectAddressHandler} > {addressDependent?"Remove Address":"Set Address" }</Button>
        {(addressDependent) && <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler}/>}
        <Input id="notes" element="textarea" label="Notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler}/>
      </form>
    </Modal>}
</React.Fragment>)
};

export default ToDoItemModal;