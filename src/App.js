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
  LOGOUT_USER,
  POPULATE_BUSINESSES,
  LOADING_COMPLETE
} from './actionTypes'



import LoginManager from './helpers/LoginManager'
import ApiManager from './helpers/ApiManager';
import Parser from './helpers/Parser'

import AppDecider from './wrappers/AppDecider'

export default function App() {

  const user = useContext(UserContext)
  const [state, dispatch] = useReducer(UserReducer, user)



  useEffect(() => {

    const checkUserStatus = async () => {
      const user = await ApiManager.getUser()
      if(user){
        const businesses = await ApiManager.getBusinesses()
        const businessesForContext = businesses.map(b => Parser.parseBusinessForContext(b))
        dispatch({type: POPULATE_USER, payload: {name: user.name, email: user.email, businesses: businessesForContext}}) 
      }else{
        LoginManager.clearLocalStorage()
        dispatch({type: LOGOUT_USER})
      }
    }
  
    dispatch({type: LOADING})
    checkUserStatus()
  }, [])
  
  // BELOW: Testing to see if this is faster than using wrapper
  // const renderApp = () => {
  //   return !!user.data.name ? <AuthorizedApp /> : <UnauthorizedApp />
  // }

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
