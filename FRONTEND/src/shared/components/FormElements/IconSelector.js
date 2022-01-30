import React, {useState, useContext} from 'react';
import Icon from '../UIElements/Icons';
import Input from './Input';

const IconSelector = props=> {
    const [selectedIcon,setSelectedIcon] = useState();
    

    const submitHandler = () =>{

    }
    const iconSearchHandler = event => {
        console.log(event.target.value);
        setSelectedIcon(event.target.value);
    }
    const iconClickHandler =  event => {
        console.log(event.currentTarget.dataset.index);
    }
    return(
        <React.Fragment>
        <input id="name" element="input" type ="text" label="SearchIcon"   onChange={iconSearchHandler}/>
        <Icon onClick = {iconClickHandler} search = {selectedIcon}/>
        </React.Fragment>
    );
}



export default IconSelector