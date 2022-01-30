import React, {useState, useContext} from 'react';
import Icon from '../UIElements/Icons';
import Input from './Input';

const IconSelector = props=> {
    const [searchedIcon,setSearchedIcon] = useState();

    const iconSearchHandler = event => {
        setSearchedIcon(event.target.value);
    }
    const iconClickHandler =  event => {
        props.onSelectedIcon(event);//to get icon event.currentTarget.dataset.index
    }
    return(
        <React.Fragment>
        <input id="name" element="input" type ="text" label="SearchIcon"  autocomplete="off" onChange={iconSearchHandler}/>
        <Icon onClick = {iconClickHandler} search = {searchedIcon}/>
        </React.Fragment>
    );
}



export default IconSelector