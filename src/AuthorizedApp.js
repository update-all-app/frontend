import './App.css';
import React from 'react'

import About from './components/without_auth_flow/About'
import Pricing from './components/without_auth_flow/Pricing'
import ContactUs from './components/ContactUs'
import CustomerStories from './components/CustomerStories'
import Careers from './components/Careers'
import Privacy from './components/Privacy'
import SetupPayment from './components/SetupPayment'
import CreateBusiness from './components/CreateBusiness'
import ManageBusiness from './components/ManageBusiness'
import SelectBusiness from './components/SelectBusiness'
import NotFound from './components/NotFound'



import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';



export default function AuthorizedApp() {



  return (
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
        <Route exact path ="/">
          <SelectBusiness />
        </Route>
        <Route exact path="/setup-payment">
          <SetupPayment />
        </Route>
        <Route exact path="/businesses/new">
          <CreateBusiness />
        </Route>
        <Route exact path="/businesses/:id">
          <ManageBusiness />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Route path="/">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  )
}

