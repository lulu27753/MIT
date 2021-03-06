import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App.jsx';
import reducer from 'reduxes/reducer.jsx';
import './index.less';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  reduxDevtools
));

if (process.env.NODE_ENV !== 'production') {
   console.log(process.env);
 }


// ReactDOM.render(
//   <App />,
//   document.getElementById('root'));

const render = App => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}
