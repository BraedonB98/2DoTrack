import React from 'react';
import { BrowserRouter as Router, Route , Routes, Navigate} from 'react-router-dom'; //also import Navigate for default routing

//------------------------Pages-------------------------------
import PageNotFound from './landing/pages/PageNotFound';
import HomePage from './landing/pages/HomePage';

//-----------------------Components--------------------------
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  
  let routes = (
  <Routes>
    <Route path="/" exact element={<HomePage/>} />
    <Route path="/pagenotfound"  element = {<PageNotFound/>}/> {/* Need to make this the default if path is not found, looked at navigate but havnt been able to figure out*/}
  </Routes>
  );
  
  return (
    <Router>
      <MainNavigation/>
      <main>
        {routes}  
      </main>  
    </Router>
  );
};

export default App;
