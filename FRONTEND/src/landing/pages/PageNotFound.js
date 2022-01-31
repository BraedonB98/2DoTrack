import React  from "react";
import {useNavigate} from 'react-router-dom';

import Button from "../../shared/components/FormElements/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  
  const returnHomeHandler = () => {
    navigate('/')
  }
    return(
      <React.Fragment>
        <div>
          <h1>Sorry</h1>
          <h2>Something went wrong on our end</h2>
          <h3>please go back and try again</h3>
          <h3>or go to </h3>
          <Button onClick = {returnHomeHandler}> Our Home Page</Button>
        </div>
      </React.Fragment>
    )
}

export default PageNotFound;