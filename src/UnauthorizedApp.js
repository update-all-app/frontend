import './App.css';
import React from 'react'

import Landing from './components/without_auth_flow/Landing'
import Login from './components/without_auth_flow/Login'
import About from './components/without_auth_flow/About'
import Pricing from './components/without_auth_flow/Pricing'
import Signup from './components/without_auth_flow/Signup'
import ContactUs from './components/ContactUs'
import CustomerStories from './components/CustomerStories'
import Careers from './components/Careers'
import Privacy from './components/Privacy'
import NotFound from './components/NotFound'


import { 
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from 'react-router-dom';


export default function UnauthorizedApp() {


  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
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
          <Route path="/">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
  )
}

