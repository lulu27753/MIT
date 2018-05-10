import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import DboxRouter from './DboxRouter';
import Login from 'container/login';
import Dashboard from 'container/dashboard';
// import Render from 'container/test/render.jsx';
// import MenuLink from './router/MenuLink.jsx';
// import NotFound from 'container/NotFound';
// import './App.css';
import '../style/reset.less';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route component={Dashboard} />
      </Switch>
      <DboxRouter />
    </div>
  </Router>
)
export default App;
