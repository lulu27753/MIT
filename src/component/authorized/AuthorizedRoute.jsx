import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';
function Something() {
	return <h1>Something</h1>
}
export default class AuthorizedRoute extends React.Component {
	render() {
		console.log('test');
		const { component: Component, render, authority, redirectPath, ...rest } = this.props;
		return (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{pathname: redirectPath}} />} />}
			>
    <Route {...rest} component={Something} />
  </Authorized>
		);
	}
}
