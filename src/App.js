import './App.css';
import React,
{
  useEffect
} 
from 'react'

import Landing from './components/Landing'
import Login from './components/Login'


import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import ApiManager from './helpers/ApiManager'


function App() {

  useEffect(() => {
    const getTokenTest = async () => {
      try{
        const res = await ApiManager.login("test@test.com", "password")
        console.log(res)

      }catch(err){
        console.log(`ERROR WITH FETCH ${err}`)
      }
    }


    getTokenTest()
  })
  





  return (
    <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
  )
}

export default App;
