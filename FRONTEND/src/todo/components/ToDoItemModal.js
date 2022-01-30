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
     
       address: {
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
        isValid: true
      },
      due: {
        value: {
            date:'',
            time:''
        },
        isValid: true
      },
    },false);

   
    useEffect( ()=>{
      const fetchItem = async ()=>{
        if(!loadedItem || props.taskId!==loadedItem.id){  //|| will fail out before checking second
          try { 
            let responseData
            responseData = await sendRequest(`http://localhost:5000/api/todo/getitem/${props.taskId}`);
            setLoadedItem(responseData.task);
          }
          catch(err){}
        }
      };
      if(props.taskId){fetchItem();}
      if(loadedItem.address)
        {
          setAddressDependent(true)
        }
        if(loadedItem.due){
          setTimeDependent(true)
        }
        
        if(loadedItem.recurring){
          setRecurringDependent(true)
        }
    },[sendRequest,props.taskId, loadedItem])

        
      useEffect( ()=>{
        setFormData({
          name: {
            value: loadedItem.name,
            isValid: true
          },
          priority: {
            value: loadedItem.priority,
            isValid: true
          },
          notes: {
            value: loadedItem.notes,
            isValid: true
          },
          address: {
            value: addressDependent?loadedItem.address:"",
            isValid: true
          },
          due: {
            value: {
                date:timeDependent&&loadedItem.due?loadedItem.due.date:'',
                time:timeDependent&&loadedItem.due?loadedItem.due.time:''
            },
            isValid: true
          },
          recurring: {
            value: {
                value:recurringDependent?true:false,
                time:recurringDependent&&loadedItem.recurring?loadedItem.recurring.value.time:'',//days?
                category:recurringDependent&&loadedItem.recurring?loadedItem.recurring.value.category:'',
            },
            isValid: true
          }
        },true);
      },[addressDependent,timeDependent,recurringDependent,loadedItem,setFormData])


      
    

  
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
          props.submitted(newItem)
        }
        catch(err){} 
    }
return(<React.Fragment>
    <ErrorModal error = {error} onClear={clearError}/>
    {isLoading&&
            <div className = "center">
                <LoadingSpinner/>    
            </div>}
    
    {(!isLoading && (!props.taskId||loadedItem.id===props.taskId)) &&  <Modal
      onCancel={() =>{props.onClear();}} 
      header={`${props.category.name} - ${(!!props.taskId)? `Editing "${loadedItem.name}"`:"New Task" }`} 
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={() =>{props.onClear();}}>Cancel</Button>
          <Button type="submit" onClick = {!props.taskId?newToDoSubmitHandler:editToDoSubmitHandler} disabled={!formState.isValid}> Submit </Button> </React.Fragment>}
    >
      <form id ="toDoItemModal__form" >
        <Input id="name" element="input" type ="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler} initialValue = {!props.taskId?"": loadedItem.name} initialValid = {!props.taskId?false:true}/>
        <Input id="priority" element="input" type = "range" min="1" max ="5" validators={[VALIDATOR_REQUIRE()]} label={`Priority - ${formState.inputs.priority.value}`}  onInput={inputHandler} initialValue = {!props.taskId?1: loadedItem.priority} initialValid = {!props.taskId?false:true}/>
        <Button onClick = {selectTimeHandler} > {timeDependent?"Remove Date":"Set Date" }</Button>
        {(timeDependent) && <Input id="date" element="date" type = "date" label="Date"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a date if it is due." initialValue = {(!props.taskId || !loadedItem.due)?"": loadedItem.due.date} initialValid = {!props.taskId?false:true}/> }
        {(timeDependent) && <Input id="time" element="time" type = "time" label="Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a time if it is due."initialValue = {(!props.taskId || !loadedItem.due)?"": loadedItem.due.time} initialValid = {!props.taskId?false:true}/>}
        {(timeDependent) && <Button onClick = {recurringHandler} > {recurringDependent?"Stop Recurring":"Make Recurring" }</Button> }
        {(timeDependent && !recurringDependent) && <React.Fragment><br/><br/></React.Fragment>}
        {(recurringDependent) && <Input id="reccuring" element="time" type = "time" label="Recurring Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a recurring time." initialValue = {(!props.taskId )?"": loadedItem.recurring} initialValid = {!props.taskId?false:true}/>}
        <Button onClick = {selectAddressHandler} > {addressDependent?"Remove Address":"Set Address" }</Button>
        {(addressDependent) && <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler} initialValue = {(!props.taskId)?"": loadedItem.address} initialValid = {!props.taskId?false:true}/>}
        <Input id="notes" element="textarea" label="Notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler} initialValue = {(!props.taskId)?"": loadedItem.notes} initialValid = {!props.taskId?false:true}/>
      </form>
    </Modal>}
</React.Fragment>)
};

export default ToDoItemModal;