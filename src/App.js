import './App.css';
import React from 'react'
import Landing from './components/Landing'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
  )
}

export default App;
