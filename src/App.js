import './App.css';
import React,
{
  useEffect, 
  useReducer,
  useContext
} 
from 'react'

import Landing from './components/Landing'
import Login from './components/Login'
import Home from './components/Home'

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

import WithAuth from './wrappers/WithAuth'
import WithoutAuth from './wrappers/WithoutAuth'

function App() {

  const user = useContext(UserContext)
  const [state, dispatch] = useReducer(UserReducer, user)



  useEffect(() => {

    const checkUserStatus = async () => {
      dispatch({type: LOADING})
      const user = await ApiManager.getUser()
      console.log(user)
      if(user){
        dispatch({type: POPULATE_USER, payload: {email: user.email}}) //, name: user.name}}
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
        <Router>
          <Switch>
            <Route exact path="/">
              <WithoutAuth>
                <Landing />
                </WithoutAuth>
            </Route>
            <Route exact path="/login">
              <WithoutAuth>
                <Login />
              </WithoutAuth>
            </Route>
            <Route exact path ="/home">
              <WithAuth>
                <Home />
              </WithAuth>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  </React.StrictMode>
  )
}

export default App;
