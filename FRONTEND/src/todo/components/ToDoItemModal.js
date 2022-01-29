import React, {useEffect , useState, useContext} from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './styling/ToDoItemModal.css';

const ToDoItemModal = props => {
    const auth = useContext(AuthContext);
    const uid = auth.UID;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [timeDependent,setTimeDependent] = useState(false);
    const[addressDependent,setAddressDependent] = useState(false);
    const[recurringDependent,setRecurringDependent]=useState(false)
    const[loadedItem,setLoadedItem]= useState(false)
    
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
      // ...(addressDependent) && {address: {
      //   value: '',
      //   isValid: false
      // }},

      notes: {
        value: '',
        isValid: false
      },
      // ...(recurringDependent) && {recurring: {
      //   value: {
      //       value:false,
      //       time:'',//days?
      //       category:'',
      //   },
      //   isValid: true
      // }},
      // ...(timeDependent) && {due: {
      //   value: {
      //       date:'',
      //       time:''
      //   },
      //   isValid: true
      // }},
    },false);

   
    useEffect( ()=>{
      const fetchItem = async ()=>{
        if(!loadedItem || props.taskId!==loadedItem.id){  //|| will fail out before checking second
          try { 
            let responseData
            responseData = await sendRequest(`http://localhost:5000/api/todo/getitem/${props.taskId}`);
            console.log("updating")
            setLoadedItem(responseData.task);
          }
          catch(err){}
        }
        
        setFormData({
          name: {
            value: loadedItem.name,
            isValid: true
          },
          priority: {
            value: loadedItem.priority,
            isValid: true
          },
          status: {
            value: loadedItem.status,
            isValid: true
          },
          ...(loadedItem.address) && {address: {
            value: loadedItem.address,
            isValid: true
          }},
          notes: {
            value: loadedItem.notes,
            isValid: true
          },
        },true);


      if(loadedItem.due){
        setTimeDependent(true)
      }
      if(loadedItem.address){
        setAddressDependent(true)
      }
      if(loadedItem.recurring){
        setRecurringDependent(true)
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

    const editToDoSubmitHandler = async event =>{
        event.preventDefault();
        try {
          await sendRequest(
              `http://localhost:5000/api/todo/edititem/${props.taskId}`,
              'PATCH',
              JSON.stringify({
                name: formState.inputs.name.value,
                priority: formState.inputs.priority.value,
                address: formState.inputs.address.value,
                notes: formState.inputs.notes.value,
              }),
              {'Content-Type': 'application/json'}
            );

            loadedItem.name = formState.inputs.name.value
            loadedItem.priority = formState.inputs.priority.value
            loadedItem.address = formState.inputs.address.value
            loadedItem.notes = formState.inputs.notes.value
            props.submitted(loadedItem);
        }
        catch(err){}
        
    }

    const newToDoSubmitHandler = async event =>{
      event.preventDefault();
      
        try {
          var newItem = sendRequest(
            `http://localhost:5000/api/todo/createItem`,
            'POST',
            JSON.stringify({
              name: formState.inputs.name.value,
              status: "Pending",
              priority: formState.inputs.priority.value,
              address: formState.inputs.address.value,
              notes: formState.inputs.notes.value,
              cid: props.category.name,
              uid:uid
            }),
            {'Content-Type': 'application/json'}
          )
          props.submitted(newItem)//!lets parent know which item was submitted so it can update page of tasks
        }
        catch(err){} 
      
        
    }
return(<React.Fragment>
    <ErrorModal error = {error} onClear={clearError}/>
    {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}
    
    {(!isLoading && (props.newItem||loadedItem.id===props.taskId)) &&  <Modal
      onCancel={() =>{props.onClear();}} 
      header={`${props.category.name} - ${(!props.newItem)? `Editing "${loadedItem.name}"`:"New Task" }`} 
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={() =>{props.onClear();}}>Cancel</Button>
          <Button type="submit" onClick = {props.newItem?newToDoSubmitHandler:editToDoSubmitHandler} disabled={!formState.isValid}> Submit </Button> </React.Fragment>}
    >
      <form id ="toDoItemModal__form" >
        <Input id="name" element="input" type ="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler} initialValue = {props.newItem?"": loadedItem.name}/>
        <Input id="priority" element="input" type = "range" min="1" max ="5" validators={[VALIDATOR_REQUIRE()]} label={`Priority - ${formState.inputs.priority.value}`}  onInput={inputHandler} initialValue = {props.newItem?1: loadedItem.priority}/>
        <Button onClick = {selectTimeHandler} > {timeDependent?"Remove Date":"Set Date" }</Button>
        {(timeDependent) && <Input id="date" element="date" type = "date" label="Date"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a date if it is due." initialValue = {(props.newItem || !loadedItem.due)?"": loadedItem.due.date}/> }
        {(timeDependent) && <Input id="time" element="time" type = "time" label="Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a time if it is due."initialValue = {(props.newItem || !loadedItem.due)?"": loadedItem.due.time}/>}
        {(timeDependent) && <Button onClick = {recurringHandler} > {recurringDependent?"Stop Recurring":"Make Recurring" }</Button> }
        {(timeDependent && !recurringDependent) && <React.Fragment><br/><br/></React.Fragment>}
        {(recurringDependent) && <Input id="reccuring" element="time" type = "time" label="Recurring Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a recurring time." initialValue = {(props.newItem )?"": loadedItem.recurring}/>}
        <Button onClick = {selectAddressHandler} > {addressDependent?"Remove Address":"Set Address" }</Button>
        {(addressDependent) && <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler} initialValue = {(props.newItem)?"": loadedItem.address}/>}
        <Input id="notes" element="textarea" label="Notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler} initialValue = {(props.newItem)?"": loadedItem.notes}/>
      </form>
    </Modal>}
</React.Fragment>)
};

export default ToDoItemModal;