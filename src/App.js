import './App.css';
import React,
{
  useEffect, 
  useReducer,
  useContext
} 
from 'react'

import Landing from './components/without_auth_flow/Landing'
import Login from './components/without_auth_flow/Login'
import Home from './components/Home'
import About from './components/without_auth_flow/About'
import Pricing from './components/without_auth_flow/Pricing'
import Signup from './components/without_auth_flow/Signup'
import ContactUs from './components/ContactUs'
import CustomerStories from './components/CustomerStories'
import Careers from './components/Careers'
import Privacy from './components/Privacy'
import SetupPayment from './components/SetupPayment'
import CreateBusiness from './components/CreateBusiness'

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
            <Route exact path="/signup">
              <WithoutAuth>
                <Signup />
              </WithoutAuth>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path='/contact'>
              <ContactUs />
            </Route>
            <Route exact path='/customer-stories'>
              <CustomerStories />
            </Route>
            <Route exact path='/careers'>
              <Careers />
            </Route>
            <Route exact path='/privacy'>
              <Privacy />
            </Route>
            <Route exact path="/pricing">
              <Pricing />
            </Route>
            <Route exact path ="/home">
              <WithAuth>
                <Home />
              </WithAuth>
            </Route>
            <Route exact path="/setup-payment">
              <WithoutAuth>
                <SetupPayment />
              </WithoutAuth>
            </Route>
            <Route exact path="/businesses/new">
              <WithAuth>
                <CreateBusiness />
              </WithAuth>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  </React.StrictMode>
  )
}

export default App;
