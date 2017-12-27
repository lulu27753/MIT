import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import MainLayout from './templates/layout'
import Collapse from './templates/collapse'
import Select from './templates/select'

import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/layout' component={MainLayout} />
      <Route exact path='/collapse' component={Collapse} />
      <Route exact path='/select' component={Select} />
    </div>
  </Router>
  )
export default App;
