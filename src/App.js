import './App.css';
import React,
{
  useEffect, 
  useReducer,
  useContext
} 
from 'react'

import AuthorizedApp from './AuthorizedApp'
import UnauthorizedApp from './UnauthorizedApp'

import UserContext from './context/UserContext'
import UserReducer from './reducers/UserReducer'
import {
  POPULATE_USER,
  LOADING,
  LOGOUT_USER
} from './actionTypes'

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import LoginManager from './helpers/LoginManager'
import ApiManager from './helpers/ApiManager';

import AppDecider from './wrappers/AppDecider'

export default function App() {

  const user = useContext(UserContext)
  const [state, dispatch] = useReducer(UserReducer, user)



  useEffect(() => {

    const checkUserStatus = async () => {
      dispatch({type: LOADING})
      const user = await ApiManager.getUser()
      if(user){
        dispatch({type: POPULATE_USER, payload: {name: user.name, email: user.email}}) 
      }else{
        LoginManager.clearLocalStorage()
        dispatch({type: LOGOUT_USER})
      }
    }

    checkUserStatus()

  }, [])
  



  return (
    <React.StrictMode>
      <UserContext.Provider value={{state, dispatch}}>
        <AppDecider>
          <UnauthorizedApp />
          <AuthorizedApp />
        </AppDecider>
      </UserContext.Provider>
    </React.StrictMode>
  )
}
