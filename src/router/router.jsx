/*
* @Author: lulu27753
* @Date:   2018-04-19 16:32:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-25 22:33:39
*/
import { getMenuData } from 'container/dashboard/getMenuData';
import React from 'react';
import {Route} from 'react-router-dom';

const About = () => (
  <div>
    <h3>About</h3>
  </div>
)

const Home = () => (
  <div>
    <h3>Home</h3>
  </div>
)

const Message = ({ match }) => (
  <div>
    <h3>new messages</h3>
    <h3>{match.params.id}</h3>
  </div>
)

const Inbox = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <Route path={`${match.url}/messages/:id`} component={Message} />

  </div>
)

function getFlatMenuData(menus) {
	let keys = {};
	menus.forEach((item) => {
		if (item.children) {
			keys[item.path] = { ...item };
			keys = { ...keys, ...getFlatMenuData(item.children) };
		} else {
			keys[item.path] = { ...item };
		}
	});
	return keys;
}
export const getRouterData = () => {
	const routerConfig = {
		'/': { component: {About} },
		'/dashboard': { component: {About} },
		'/dashboard/version-manage': { component: {Home} },
		'/dashboard/demand-manage': { component: () => <h1>demand-manage</h1> },
		'/dashboard/scenario-manage': { component: () => <h1>scenario-manage</h1> },
		'/dashboard/user-case-manage': { component: () => <h1>user-case-manage</h1> },
		'/dashboard/business-tree': { component: () => <h1>business-tree</h1> },
		'/tasks/server-list': { component: () => <h1>server-list</h1> },
		'/tasks/task-list': { component: () => <h1>task-list</h1> },
		'/system/user-list': { component: () => <h1>user-list</h1> },
		'/system/basic-list': { component: () => <h1>basic-list</h1> },
		'/log/scenario-chart': { component: () => <h1>scenario-chart</h1> },
		'/log/user-case-chart': { component: () => <h1>user-case-chart</h1> },
		'/log/task-logo-search': { component: () => <h1>task-logo-search</h1> },
		'/log/check-log': { component: () => <h1>check-logss</h1> },
	};

	// 从getMenuData获取name的值 或者 直接在路由数据中设置它的值
	const menuData = getFlatMenuData(getMenuData());
	const routerData = {};
	Object.keys(routerConfig).forEach((item) => {
		const menuItem = menuData[item.replace(/^\//, '')] || {};
		routerData[item] = {
			...routerConfig[item],
			name: routerConfig[item].name || menuItem.name,
			authority: routerConfig[item].authority || menuItem.authority,
		}
	})
	// console.log('routerData', routerData);
	return routerData;
}
