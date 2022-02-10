import React, { useContext, useState, useEffect } from "react";

import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import DashBoardItem from "../components/DashBoardItem";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/DashBoard.css";
import react from "react";

const DUMMYDASHBOARDLAYOUT = [
  [
    {
      feature: "To Do Category", //item list or finance value
      reference: "MONGO(ID)", //location/id
      configuration: "none", //modifiers
    },
    {
      feature: "To Do Priority", //item list or finance value
      reference: "MONGO(ID)", //location/id
      configuration: "{Priority: 5}", //modifiers
    },
  ],
  [
    null,
    null,
    {
      feature: "Finance amount", //item list or finance value
      reference: "Main Bank", //location/id
      configuration: "value", //modifiers
    },
  ],
];

const DashBoard = () => {
  const auth = useContext(AuthContext);
  const UID = auth.UID;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState();
  const [preferences, setPreferences] = useState();

  useEffect(() => {
    const fetchName = async () => {
      try {
        let responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/uid/user/${UID}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        responseData = responseData.user;
        responseData.shortName = responseData.name.split(" ")[0];
        setUser(responseData);
      } catch (error) {}
    };
    const fetchPreferences = async () => {
      try {
        let responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/user/info/preferences`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        responseData = responseData.preferences;
        setPreferences(responseData);
      } catch (error) {}
    };

    fetchName();
    fetchPreferences();
  }, [sendRequest, UID, auth.token]);

  return (
    <react.Fragment>
      {!isLoading && (
        <div className="dashboard">
          <div className="dashboard__header">
            {user && <h1>{user.shortName}'s DashBoard</h1>}
          </div>

          <div className="dashboard__content">
            {DUMMYDASHBOARDLAYOUT.map((column, indexColumn) => {
              return (
                <div key={indexColumn} className="dashboard__column">
                  {column.map((item, indexRow) => {
                    return (
                      <DashBoardItem
                        key={[indexColumn, indexRow]}
                        item={item}
                        column={indexColumn}
                        row={indexRow}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </react.Fragment>
  );
};

export default DashBoard;
