import React, {useState, useEffect, useContext } from "react";

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import PendingItemList from "../components/PendingItemList";

import { useHttpClient } from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";

const PendingTaskModal = props => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();//eslint-disable-line
    const [pendingTasks,setPendingTasks]= useState()
    const auth= useContext(AuthContext);
    const UID = auth.UID;

    useEffect( ()=>{
        const fetchPendingTasks = async () =>{
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/getPendingSharedItems/${UID}`);
                setPendingTasks(responseData.items);
            }
            catch(err){}
        }
        fetchPendingTasks();
    },[sendRequest,UID])

    const taskDismissHandler = (dismissedTaskId) => {
        console.log("pendingTasks");
        setPendingTasks(prevTasks => prevTasks.filter(task => task._id !== dismissedTaskId));
        console.log(pendingTasks);
    };

    const pendingSubmitHandler = async event =>
    {
        console.log(JSON.parse(event.target.value));
        console.log(props.category)
        
        try{
            let taskAccepted = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/acceptPendingSharedItem`,'PATCH',
                JSON.stringify({
                    tid : (JSON.parse(event.target.value)._id),
                    uid: UID,
                    cid: props.category.name
                 }),
                {'Content-Type': 'application/json'});
                taskAccepted = taskAccepted.item
                setPendingTasks(pendingTasks.filter(task => task._id.toString() !== taskAccepted._id));
                props.onTaskAccepted(taskAccepted);
                
            
        }
       catch(error){
           console.log(error);
       }
    }

  return (
    <Modal
      onCancel={props.onClear}
      header={`Adding Tasks to - ${props.category.name}`}
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={true}
    >
    {(!isLoading && pendingTasks) && <PendingItemList onPendingSubmit = {pendingSubmitHandler} onDismissTask = {taskDismissHandler} items = {pendingTasks} />}
      
    </Modal>
  );
};

export default PendingTaskModal;
