import React  from "react";

const PageNotFound = () => {
    return(
      <React.Fragment>
        <div>
          <h1>Sorry</h1>
          <h2>Something went wrong on our end</h2>
          <h3>please go back and try again</h3>
          <h3>or go to </h3>
          <a href = "http://localhost:3000/"> Our Home Page</a>
        </div>
      </React.Fragment>
    )
}

export default PageNotFound;