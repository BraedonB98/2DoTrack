import React,{ useState}from "react";
import {AiOutlineCheck,AiOutlineFieldTime,AiOutlineUnorderedList} from "react-icons/ai"
//-----------------------Components--------------------------
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card'
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Map from '../../shared/components/UIElements/Map';

//----------------------Context--------------------------------


//----------------------Hooks---------------------------------
import { useHttpClient } from "../../shared/hooks/http-hook";

//---------------------CSS-----------------------------------
import "./ToDoItem.css"

const ToDoItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [expand, setExpand] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => {
        setShowMap(true);
    }
    const closeMapHandler = () => {
        setShowMap(false);
    }
    const showDeleteWarningHandler = () =>{
        //console.log(props.id)
        setShowConfirmModal(true);
    }
    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    }
    const confirmDeleteHandler = async () =>{
        
        try{
            
             await sendRequest(`http://localhost:5000/api/todo/deleteitem/`,'DELETE',
            JSON.stringify({
              tid : props.id}),
              {'Content-Type': 'application/json'});
            props.onDeleteTask(props.id);
       }
        catch(error){}
        console.log("You just got deleted!!!! BOOM");
        setShowConfirmModal(false)
    };
    const toggleExpand=()=>{
        if(expand)
        {
            setExpand(false);
        }
        else{
            setExpand(true);
        }
    }
    const startTask = async() => {

        try{
            
            await sendRequest(`http://localhost:5000/api/todo/edititem/${props.id}`,'PATCH',
           JSON.stringify({
             status : "Started"}),
             {'Content-Type': 'application/json'});

             props.onStatusChange(props.id,"Started")
           
      }
       catch(error){
           console.log("unable to change task status")
       }
       
    }
    const finishTask = async() => {
        try{
            
            await sendRequest(`http://localhost:5000/api/todo/edititem/${props.id}`,'PATCH',
           JSON.stringify({
             status : "Complete"}),
             {'Content-Type': 'application/json'});
            props.onStatusChange(props.id,"Complete")
      }
       catch(error){
           console.log("unable to change task status")
       }
    }

return(
    <React.Fragment>
            <ErrorModal error= {error} onClear = {clearError} />
            <Modal 
                show = {showMap} 
                onCancel ={closeMapHandler} 
                header = {props.address} 
                contentClass="todo-item__modal-content"
                footerClass="todo-item__modal-actions"
                footer={<Button onClick= {closeMapHandler}>CLOSE</Button>}    
            >
                <div className="map-container">
                    <Map center ={props.coordinates} zoom ={16}/>
                </div>
            </Modal>
            <Modal 
                show = {showConfirmModal}
                onCancel = {cancelDeleteHandler}
                header = "Are you sure?"
                footerClass = "todo-item__modal-actions" 
                footer = {
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                } >
                    <p>Are you sure you want to delete this Task?</p>
            </Modal>
        <li className="todo-item ">
        <Card  className="todo-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
        <div onClick = {toggleExpand}  className="todo-item__header">
            {props.status === "Complete" && <AiOutlineCheck/>}
            {props.status === "Started" && <AiOutlineFieldTime/>}
            {props.status === "Pending" && <AiOutlineUnorderedList/>}
            <h2>{props.name}</h2>
        </div>
        {expand && (<div className="todo-item__expand">
            <p>{props.notes}</p>
            {props.status ==="Pending" && (<Button onClick={startTask}>Start Task</Button>)}
            {props.status ==="Started" && (<Button onClick={finishTask}>Finish Task</Button>)}

            <Button onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick = {showDeleteWarningHandler}>DELETE</Button>
            </div>)}
        </Card>
    </li>
    </React.Fragment> 
)}

export default ToDoItem;