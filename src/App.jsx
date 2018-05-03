import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import DboxRouter from './DboxRouter';
import Login from 'container/login';
import Dashboard from 'container/dashboard';
import Render from 'container/test/render.jsx';
// import NotFound from 'container/NotFound';
// import './App.css';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/render' component={Render} />
        <Route path='/dashboard' component={Dashboard} />
        <Route component={Dashboard} />
      </Switch>
      <DboxRouter />
    </div>
  </Router>
)
export default App;
