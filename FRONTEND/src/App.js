import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

//-----------------------Components--------------------------
import MainNavigation from "./shared/components/Navigation/MainNavigation";

//----------------------Context--------------------------------
import { AuthContext } from "./shared/context/auth-context";
import { UserContext } from "./shared/context/user-context";

//-----------------------Hooks-------------------------------
import { UserAuth } from "./shared/hooks/auth-hook";
import { UserInfo } from "./shared/hooks/user-hook";

//------------------------Pages-------------------------------(dev)
//import PageNotFound from './landing/pages/PageNotFound';
import HomePage from "./landing/pages/HomePage";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

//-------------------------Code Splitting-------------------(production efficiency )
const AuthPage = React.lazy(() => import("./users/pages/AuthPage"));
const DashBoard = React.lazy(() => import("./users/pages/DashBoard"));
const ToDoPage = React.lazy(() => import("./todo/pages/ToDoPage"));
const FinancePage = React.lazy(() => import("./finance/pages/FinancePage"));
const UserPreferencePage = React.lazy(() =>
  import("./users/pages/UserPreferencePage")
);

const App = () => {
  const { token, login, logout, UID } = UserAuth();
  const { name, email, userId, imageUrl, setUser, removeUser } = UserInfo();

  let routes;
  if (token) {
    routes = ( //if user logged in
      <Routes>
        <Route path="*" element={<DashBoard />} />
        <Route path="/" exact element={<DashBoard />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/userpreferences" element={<UserPreferencePage />} />
      </Routes>
    );
  } else {
    //if user not logged in
    routes = (
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        userId,
        imageUrl,
        setUser,
        removeUser,
      }}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          UID,
          login,
          logout,
        }}
      >
        <Router>
          <MainNavigation />
          <main id="content">
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
