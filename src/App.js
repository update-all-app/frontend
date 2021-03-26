import "./App.css";
import React, { useEffect, useReducer, useContext } from "react";

import AuthorizedApp from "./AuthorizedApp";
import UnauthorizedApp from "./UnauthorizedApp";

import UserContext from "./context/UserContext";
import UserReducer from "./reducers/UserReducer";
import { POPULATE_USER, LOADING, LOGOUT_USER } from "./actionTypes";

import LoginManager from "./helpers/LoginManager";
import ApiManager from "./helpers/ApiManager";
import Parser from "./helpers/Parser";

import AppDecider from "./wrappers/AppDecider";

export default function App() {
  const user = useContext(UserContext);
  const [state, dispatch] = useReducer(UserReducer, user);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = await ApiManager.getUser();
        console.log(user)
        if (user) {
          const businesses = await ApiManager.getBusinesses();
          const businessesForContext = businesses.map((b) =>
            Parser.parseBusinessForContext(b)
          );
          const formattedServices = user.services.map(s => ({
            provider: s.provider,
            userID: s.provider_uid,
            label: s.label
          }))
          dispatch({
            type: POPULATE_USER,
            payload: {
              name: user.name,
              email: user.email,
              paymentStatusCurrent: user.payment_status_current,
              businesses: businessesForContext,
              services: formattedServices
            }
          });
        } else {
          LoginManager.clearLocalStorage();
          dispatch({ type: LOGOUT_USER });
        }
      } catch {
        LoginManager.clearLocalStorage();
        dispatch({ type: LOGOUT_USER });
      }
    };

    dispatch({ type: LOADING });
    checkUserStatus();
  }, []);

  // BELOW: Testing to see if this is faster than using wrapper
  // const renderApp = () => {
  //   return !!user.data.name ? <AuthorizedApp /> : <UnauthorizedApp />
  // }

  return (
    // <React.StrictMode>
    <UserContext.Provider value={{ state, dispatch }}>
      <AppDecider>
        <UnauthorizedApp />
        <AuthorizedApp />
      </AppDecider>
    </UserContext.Provider>
    // </React.StrictMode>
  );
}
