import React,{useState}from "react";
import {AiOutlineCheck,AiOutlineFieldTime,AiOutlineUnorderedList} from "react-icons/ai"
//-----------------------Components--------------------------
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card'
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


//----------------------Context--------------------------------


//----------------------Hooks---------------------------------
import { useHttpClient } from "../../shared/hooks/http-hook";

//---------------------CSS-----------------------------------
import "./styling/CategoryToggle.css"


const CategoryToggle = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
 
    const showDeleteWarningHandler = () =>{
        setShowConfirmModal(true);
    }
    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    }
    const confirmDeleteHandler = async () =>{
        
        console.log("will add delete category later")
        setShowConfirmModal(false)
    };
    const changeCategoryHandler = () =>{
        const cat = {
            name:props.name,
            icon:props.icon,
            _id:props.id,
            toDoList:props.toDoList
        }
        props.onChangeCategory(cat);
    }
    

return(
    <React.Fragment>
            <ErrorModal error= {error} onClear = {clearError} />
            <Modal 
                show = {showConfirmModal}
                onCancel = {cancelDeleteHandler}
                header = "Are you sure?"
                footerClass = "category-toggle__modal-actions" 
                footer = {
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                } >
                    <p>Are you sure you want to delete this Task?</p>
            </Modal>
        
        <Card  onClick = {changeCategoryHandler} className="category-toggle">
        {isLoading && <LoadingSpinner asOverlay />}
            <div className="category-toggle__header-div">
                <h2>{props.name}</h2>
            </div>
        </Card>
    </React.Fragment> 
)}

export default CategoryToggle;