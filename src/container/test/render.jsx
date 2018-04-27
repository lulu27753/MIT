import React from 'react';

import { Route, Link } from 'react-router-dom';

function Something() {
	return <h1>Something</h1>
}
export default class Render extends React.Component {
	render() {
	 const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (

    <Component {...props} />

    )} />
    )
		console.log('test');
		return (
  <div>
    <div><a href='/render/hi'>Hi</a></div>
    <div><Link to='/render/cool'>cool</Link></div>
    <Route path='/render/hi' render={() => <h1>Hi</h1>} />
    <FadingRoute path='/render/cool' component={Something} />
  </div>
		);
	}
}
