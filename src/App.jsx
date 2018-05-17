import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'babel-polyfill';

import Login from 'container/login';
import Dashboard from 'container/dashboard';
import NotFound from 'container/NotFound';
import '../style/reset.less';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
export default App;
