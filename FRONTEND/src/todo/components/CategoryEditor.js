import React,{ useState,useContext}from "react";

//-----------------------Components--------------------------
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button"
import Modal from "../../shared/components/UIElements/Modal";
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import IconSelector from '../../shared/components/FormElements/IconSelector';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
//---------------------CSS----------------------------------
//import "./styling/CategoryEditor.css"



const CategoryEditor = props=> {
    const auth = useContext(AuthContext);
    const uid = auth.UID;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
        name: {
          value: props.category.name,
          isValid: true
        },
      },true);
    
    const renameHandler = async() =>{
        try{
            const category = await sendRequest(`http://localhost:5000/api/todo/renamecategory`,'PATCH',
             JSON.stringify({
               uid : uid,
               name : props.category.name,
               newName: formState.inputs.name.value
            }),
               {'Content-Type': 'application/json'});
            props.onRename(category.category);
            setShowRename(false)
       }
        catch(error){
            console.log(error);
        }
    }

    const confirmDeleteHandler = async () =>{
        
        try{
            
            await sendRequest(`http://localhost:5000/api/todo/category`,'DELETE',
            JSON.stringify({
            uid : uid,
            cid: props.category.name
            }),
            {'Content-Type': 'application/json'});
            props.onDelete(props.category); 
       }
        catch(error){}
        setShowConfirmModal(false)
        
    };
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
            <Button  onClick={()=>{showRename?setShowRename(false):setShowRename(true)}}>Rename</Button>
            <Button  onClick={()=>{showIcon?setShowIcon(false):setShowIcon(true)}}>Change Icon</Button>
            <Button danger onClick={()=>{setShowConfirmModal(true);}}>DELETE</Button>
            {showRename&& <div>
                <form id ="toDoItemModal__form" >
                <Input id="name" element="input" type ="text" label="Rename Category" validators={[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid category name." onInput={inputHandler} initialValue = {props.category.name} initialValid = {true}/>
                </form>
                <Button type="submit" onClick = {renameHandler} disabled={!formState.isValid}> Submit </Button>
            </div>}
            {setShowIcon&& <div>
                
                </div>}
        </Card>
        </React.Fragment>
    );
}
export default CategoryEditor;
