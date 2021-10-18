import './App.css';
import React, { useReducer, useContext, useEffect } from 'react';

import About from './components/without_auth_flow/About';
import Pricing from './components/without_auth_flow/Pricing';
import ContactUs from './components/ContactUs';
import CustomerStories from './components/CustomerStories';
import Careers from './components/Careers';
import Privacy from './components/Privacy';
import SetupPayment from './components/SetupPayment';
import CreateBusiness from './components/CreateBusiness';
import CreateBusinessSimple from './components/CreateBusinessSimple';
import ManageBusiness from './components/ManageBusiness';
import SelectBusiness from './components/SelectBusiness';
import AuthorizeServices from './components/AuthorizeServices';

import EventReducer from './reducers/EventReducer';
import EventContext from './context/EventContext';

import { initFBSDK } from './apiClients/FBClient';
import { initGoogleSDK } from './apiClients/GoogleClient';

import { LOADING, LOADING_COMPLETE } from './actionTypes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import WithHeaderAndFooter from './wrappers/WithHeaderAndFooter';

export default function AuthorizedApp() {
  const events = useContext(EventContext);
  const [state, dispatch] = useReducer(EventReducer, events);

  useEffect(() => {
    dispatch({ type: LOADING });
    Promise.all([initFBSDK(), initGoogleSDK()]).then(() => {
      dispatch({ type: LOADING_COMPLETE });
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/contact'>
          <WithHeaderAndFooter fullWidth>
            <ContactUs />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/customer-stories'>
          <WithHeaderAndFooter fullWidth>
            <CustomerStories />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/careers'>
          <WithHeaderAndFooter fullWidth>
            <Careers />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/privacy'>
          <WithHeaderAndFooter fullWidth>
            <Privacy />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/pricing'>
          <WithHeaderAndFooter fullWidth>
            <Pricing />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/'>
          <SelectBusiness />
        </Route>
        <Route exact path='/setup-payment'>
          <WithHeaderAndFooter fullWidth>
            <SetupPayment />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/authorize-services'>
          <WithHeaderAndFooter fullWidth>
            <AuthorizeServices />
          </WithHeaderAndFooter>
        </Route>
        <Route exact path='/businesses/new'>
          <WithHeaderAndFooter fullWidth>
            <CreateBusinessSimple />
          </WithHeaderAndFooter>
        </Route>
        <Route path='/businesses/:id'>
          <EventContext.Provider value={{ state, dispatch }}>
            <ManageBusiness />
          </EventContext.Provider>
        </Route>
        <Route path='/'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
}
