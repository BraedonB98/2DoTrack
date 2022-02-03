import React, {useState, useEffect, useContext } from "react";

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import PendingItemList from "../components/PendingItemList";

import { useHttpClient } from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";

const PendingTaskModal = props => {
    const{isLoading,error,sendRequest,clearError} = useHttpClient();
    const [pendingTasks,setPendingTasks]= useState()
    const auth= useContext(AuthContext);
    const UID = auth.UID;

    useEffect( ()=>{
        const fetchPendingTasks = async () =>{
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/todo/getPendingSharedItems/${UID}`);
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
  return (
    <Modal
      onCancel={props.onClear}
      header={`Adding Tasks to - ${props.category.name}`}
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={true}
    >
    {(!isLoading && pendingTasks) && <PendingItemList onDismissTask = {taskDismissHandler} items = {pendingTasks} />}
      
    </Modal>
  );
};

export default PendingTaskModal;
