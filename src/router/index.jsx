import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getRouterData } from './router';

export default class RouterConfig extends React.Component {
	render() {
		const routerData = getRouterData();
		return (
  <div />
		);
	}
}
