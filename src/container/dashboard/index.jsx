import React from 'react';
import { withRouter } from 'react-router';
// 将非路由组件传入到withRouter高阶组件以获得{ match, location, history }等对象属性
import Dashboard from './Dashboard';
import {getRouterData} from '../../router/router.jsx';

class BasicLayout extends React.Component {
	render() {
		// console.log('BasicLayout', this.props);
		const routerData = getRouterData();
		console.log('routerData', routerData);
		const currentUser = {
			avatar: '',
			name: 'admin',
			notifyCount: 12,
			userid: '00000001ß'
    }
    const systemName = '产险业务管理系统';
		return (
      <Dashboard
        collapsed={false}
        {...this.props}
        routerData={routerData}
        currentUser={currentUser}
        systemName={systemName}
        />
		);
	}
}
export default withRouter(BasicLayout);
