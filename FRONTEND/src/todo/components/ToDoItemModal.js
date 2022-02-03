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
        value: undefined,
        isValid: true
      },
      due: {
        value: undefined,
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
            value: loadedItem?loadedItem.name:formState.inputs.name.value,
            isValid: loadedItem?true:formState.inputs.name.valid
          },
          priority: {
            value: loadedItem?loadedItem.priority:formState.inputs.priority.value,
            isValid: true
          },
          notes: {
            value: loadedItem?loadedItem.notes:formState.inputs.notes.value,
            isValid: loadedItem?true:formState.inputs.notes.valid
          },
          address: {
            value: addressDependent?loadedItem.address:"",
            isValid: true
          },
          due: {
            value: timeDependent?{
                date:timeDependent&&loadedItem.due?loadedItem.due.date:'',
                time:timeDependent&&loadedItem.due?loadedItem.due.time:''
            }:undefined,
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
        },loadedItem?true:formState.valid);
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
        let taskEdited = {
          _id: loadedItem._id,
          name: formState.inputs.name.value,
          priority: formState.inputs.priority.value,
          address: formState.inputs.address.value,
          due: formState.inputs.due.value,
          notes: formState.inputs.notes.value,
        }
        try {
          if(!addressDependent){
           taskEdited.address=undefined;
           taskEdited.location=undefined;
          }
          if(!timeDependent){
            taskEdited.due=undefined;
          }
          await sendRequest(
              `http://localhost:5000/api/todo/edititem/${props.taskId}`,
              'PATCH',
              JSON.stringify(taskEdited),
              {'Content-Type': 'application/json'}
            );
            taskEdited.status = loadedItem.status;
            props.submitted(taskEdited);
        }
        catch(err){}
        
    }

    const newToDoSubmitHandler = async event =>{
      event.preventDefault();
        try {
          let taskNew = {
            name: formState.inputs.name.value,
            status: "Pending",
            priority: formState.inputs.priority.value,
            address: formState.inputs.address.value,
            due: formState.inputs.due.value,
            notes: formState.inputs.notes.value,
            cid: props.category.name,
            uid:uid
          }
            if(!addressDependent){
            taskNew.address=undefined;
            taskNew.location=undefined;
           }
           if(!timeDependent){
             taskNew.due=undefined;
           }
           const newItem = await sendRequest(
            `http://localhost:5000/api/todo/createItem`,
            'POST',
            JSON.stringify(taskNew),
            {'Content-Type': 'application/json'}
          )

          props.submitted([newItem.task]);
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
      className = 'to-do-item-modal'
      headerClass = 'to-do-item-modal__header'
      contentClass = 'to-do-item-modal__content'
      footerClass = 'to-do-item-modal__footer'
      show={props.open}
      footer={<React.Fragment>
          <Button onClick={() =>{console.log(formState);props.onClear();}}>Cancel</Button>
          <Button type="submit" onClick = {!props.taskId?newToDoSubmitHandler:editToDoSubmitHandler} disabled={!formState.isValid}> Submit </Button> </React.Fragment>}
    >
      <form id ="to-do-item-modal__form" >
        <Input className = "to-do-item-modal__text-input to-do-item-modal__input" id="name" element="input" type ="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid task name." onInput={inputHandler} initialValue = {!props.taskId?"": loadedItem.name} initialValid = {!props.taskId?false:true}/>
        <Input className = "to-do-item-modal__input" id="priority" element="input" type = "range" min="1" max ="5" validators={[VALIDATOR_REQUIRE()]} label={`Priority - ${formState.inputs.priority.value}`}  onInput={inputHandler} initialValue = {!props.taskId?1: loadedItem.priority} initialValid = {true}/>
        <div className='to-do-item-modal__button-div'>
          <Button className = "to-do-item-modal__button" onClick = {selectTimeHandler} > {timeDependent?"Remove Date":"Set Date" }</Button>
          {(timeDependent) && <Button className = "to-do-item-modal__button" onClick = {recurringHandler} > {recurringDependent?"Stop Recurring":"Make Recurring" }</Button> }
          <Button className = "to-do-item-modal__button" onClick = {selectAddressHandler} > {addressDependent?"Remove Address":"Set Address" }</Button>
        </div>
        {(timeDependent) && <Input className = "to-do-item-modal__input" id="date" element="date" type = "date" label="Date"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a date if it is due." initialValue = {(!props.taskId || !loadedItem.due)?"": loadedItem.due.date} initialValid = {!props.taskId?false:true}/> }
        {(timeDependent) && <Input className = "to-do-item-modal__input" id="time" element="time" type = "time" label="Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a time if it is due."initialValue = {(!props.taskId || !loadedItem.due)?"": loadedItem.due.time} initialValid = {!props.taskId?false:true}/>}
        {(recurringDependent) && <Input className = "to-do-item-modal__input" id="recurring" element="time" type = "time" label="Recurring Time"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText = "Please select a recurring time." initialValue = {(!props.taskId )?"": loadedItem.recurring} initialValid = {!props.taskId?false:true}/>}
        {(addressDependent) && <Input className = "to-do-item-modal__text-input" id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid address." onInput={inputHandler} initialValue = {(!props.taskId)?"": loadedItem.address} initialValid = {!props.taskId?false:true}/>}
        <Input className = "to-do-item-modal__text-input" id="notes" element="textarea" label="Notes" validators={[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description (at least 5 characters)." onInput={inputHandler} initialValue = {(!props.taskId)?"": loadedItem.notes} initialValid = {!props.taskId?false:true}/>
      </form>
    </Modal>}
</React.Fragment>)
};

export default ToDoItemModal;