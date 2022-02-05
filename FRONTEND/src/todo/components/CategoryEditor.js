import React,{ useState,useContext}from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button"
import Modal from "../../shared/components/UIElements/Modal";
import Input from '../../shared/components/FormElements/Input';
import PendingTaskModal from "../components/PendingTaskModal";
import RemoteTaskMenu from "../components/RemoteTaskMenu";
import IconSelector from '../../shared/components/FormElements/IconSelector';
import Icon from '../../shared/components/UIElements/Icons';
import {VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
//---------------------CSS----------------------------------
import "./styling/CategoryEditor.css"



const CategoryEditor = props=> {
    const auth = useContext(AuthContext);
    const uid = auth.UID;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [showIconSelect,setShowIconSelect]= useState();
    const [showRemoteTask,setShowRemoteTask]= useState(false);
    const [showPendingTask,setShowPendingTask]= useState(false);
    const [iconSelected,setIconSelected]= useState(props.category.icon);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();//eslint-disable-line
    const [formState, inputHandler, setFormData] = useForm({//eslint-disable-line
        name: {
          value: props.category.name,
          isValid: true
        },
      },true);
    
    const renameHandler = async() =>{
        try{
            const category = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/renamecategory`,'PATCH',
             JSON.stringify({
               uid : uid,
               name : props.category.name,
               newName: formState.inputs.name.value
            }),
               {'Content-Type': 'application/json', 'Authorization':`Bearer ${auth.token}`});
            props.onEdit(category.category);
            setShowRename(false)
       }
        catch(error){
            console.log(error);
        }
    }

    const confirmDeleteHandler = async () =>{
        
        try{
            
            await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/category`,'DELETE',
            JSON.stringify({
            uid : uid,
            cid: props.category.name
            }),
            {'Content-Type': 'application/json', 'Authorization':`Bearer ${auth.token}`});
            props.onDelete(props.category); 
       }
        catch(error){}
        setShowConfirmModal(false)
        
    };

    const handleIconSelect = async (event,icon) => {
        setIconSelected(icon)
        setShowIconSelect(false)
        try{
            const category = await sendRequest(`${process.env.REACT_APP_BACKEND_API_URL}/todo/changecategoryicon`,'PATCH',
             JSON.stringify({
               uid : uid,
               name : props.category.name,
               icon: icon
            }),
               {'Content-Type': 'application/json', 'Authorization':`Bearer ${auth.token}`});
            props.onEdit(category.category);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <React.Fragment>
        <Modal 
                show = {showConfirmModal}
                onCancel = {()=>{setShowConfirmModal(false);}}
                header = "Delete Category?"
                footerClass = "todo-item__modal-actions" 
                footer = {
                    <React.Fragment>
                        <Button inverse onClick={()=>{setShowConfirmModal(false);}}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                } >
                    <p>Are you sure you want to delete this category and <strong>ALL TASKS</strong> within?</p>
            </Modal>
        <Card>
            <div className="category-editor__menu-buttons">
                <Button  onClick={()=>{showRename?setShowRename(false):setShowRename(true)}}>Rename Category</Button>
                <Button  onClick={()=>{showIconSelect?setShowIconSelect(false):setShowIconSelect(true)}}>{iconSelected &&<Icon name={iconSelected} />} Change Icon</Button>
                <Button  onClick={()=>{showRemoteTask?setShowRemoteTask(false):setShowRemoteTask(true)}}>SMS/Email Tasks</Button>
                <Button  onClick={()=>{showPendingTask?setShowPendingTask(false):setShowPendingTask(true)}}>Shared Tasks</Button>
                <Button danger onClick={()=>{setShowConfirmModal(true);}}>DELETE</Button>
            </div>
            {showRename&& <div>
                <form id ="toDoItemModal__form" >
                <Input id="name" element="input" type ="text" label="Rename Category" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid category name." onInput={inputHandler} initialValue = {props.category.name} initialValid = {true}/>
                </form>
                <Button type="submit" onClick = {renameHandler} disabled={!formState.isValid}> Submit </Button>
            </div>}
            {showRemoteTask && <RemoteTaskMenu category = {props.category}/>}
            {showPendingTask && <PendingTaskModal category = {props.category} onTaskAccepted={task=>{props.onTaskAccepted(task)}}onClear = {()=>{setShowPendingTask(false)}}/>}
            
            {showIconSelect && <IconSelector onCancel = {()=>{setShowIconSelect(false)}} onSelectedIcon = {handleIconSelect} />}
                
        </Card>
        </React.Fragment>
    );
}
export default CategoryEditor;
