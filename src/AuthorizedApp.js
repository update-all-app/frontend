import './App.css';
import React,
{
  useEffect, 
  useReducer,
  useContext
} 
from 'react'

import Home from './components/Home'
import About from './components/without_auth_flow/About'
import Pricing from './components/without_auth_flow/Pricing'
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
} from 'react-router-dom';



export default function AuthorizedApp() {

  const user = useContext(UserContext)
  const [state, dispatch] = useReducer(UserReducer, user)



  return (
    <React.StrictMode>
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Switch>
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
              <Home />
            </Route>
            <Route exact path="/setup-payment">
              <SetupPayment />
            </Route>
            <Route exact path="/businesses/new">
              <CreateBusiness />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  </React.StrictMode>
  )
}

