import React, {useState, useCallback , Suspense} from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'; //also import Navigate for default routing

//-----------------------Components--------------------------
import MainNavigation from './shared/components/Navigation/MainNavigation';

//----------------------Context--------------------------------
import { AuthContext } from './shared/context/auth-context';
import { MobileContext } from './shared/context/mobile-context';

//------------------------Pages-------------------------------(dev)
//import PageNotFound from './landing/pages/PageNotFound';
import HomePage from './landing/pages/HomePage';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// import AuthPage from './users/pages/AuthPage';
// import DashBoard from './users/pages/DashBoard'
// import ToDoPage from './todo/pages/ToDoPage';
// import FinancePage from './finance/pages/FinancePage';

//-------------------------Code Splitting-------------------(production)
//const PageNotFound = React.lazy(()=> import('./landing/pages/PageNotFound'))
//const HomePage = React.lazy(()=> import('./landing/pages/HomePage'))

const AuthPage = React.lazy(()=> import('./users/pages/AuthPage'))
const DashBoard = React.lazy(()=> import('./users/pages/DashBoard'))
const ToDoPage = React.lazy(()=> import('./todo/pages/ToDoPage'))
const FinancePage = React.lazy(()=> import('./finance/pages/FinancePage'))




const App = () => {
  const [token,setToken]=useState()
  const[UID,setUID]= useState();
  const[mobileDevice,setMobileDevice] = useState(false);// eslint-disable-line
  const[OS,setOS] = useState(false);// eslint-disable-line
  const login = useCallback((uid,token) => {
    //console.log("logging in");
    setToken(token);
    setUID(uid);
  },[])
  const logout = useCallback(() => {
    //console.log("logging out");
    setToken(null);
    setUID(null);
  },[])
  let routes;
  if (token){
    routes = ( //if user logged in
    <Routes>
      <Route path='*'element = {<DashBoard/>}/> 
      <Route path="/" exact element={<DashBoard/>} />
      <Route path="/todo" element={<ToDoPage/>} />
      <Route path="/finance" element={<FinancePage/>} />
      
    </Routes>
    );
  }
 else { //if user not logged in
    routes = (
    <Routes>
      <Route path='*'element = {<HomePage/>}/> 
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth" element={<AuthPage/>} />
    </Routes>
    );
 }
 
  
  return (
    <AuthContext.Provider 
    value = {{
      isLoggedIn:!!token,
      token,
      UID,
      login,
      logout}}
    >
      <MobileContext.Provider 
    value = {{
      mobileDevice,
      OS}}
    >
    <Router>
      <MainNavigation/>
      <main id ="content">
        <Suspense fallback = {<div className='center'><LoadingSpinner/></div>}>
        {routes}  
        </Suspense>
      </main>
    </Router>
    </MobileContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
