import React from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import NotFound from 'container/NotFound';


import Layout from 'components/layout';

import SiderMenu from 'component/sider-menu';
// import Authorized from 'component/authorized';
import GlobalHeader from 'component/globalHeader/index';

import logo from 'assets/images/logo.png';
// import { getRoutes } from 'utils/getRoutes';
import { getMenuData } from './getMenuData';
import './dashboard.less';

const Sider = Layout.Sider
const Content = Layout.Content;
const Header = Layout.Header;
// const Footer = Layout.Footer;
// const AuthorizedRoute = Authorized.AuthorizedRoute;


// 根据菜单取得重定向地址
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((child) => {
        getRedirect(child);
      });
    }
  }
}
getMenuData().forEach(getRedirect);
console.log('redirectData', redirectData);
export default class Dashboard extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  getChildContext() {
    const { location, routerData } = this.props;
    // console.log('routerData', routerData);

    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'autoTest';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}-autoTest`;
    }
    return title;
  }
  getBashRedirect() {
    // 重定向到url的redirect参数所示地址
    const urlParams = new URL(window.location.href);
    // console.log('urlParams', urlParams);
    const redirect = urlParams.searchParams.get('redirect') || '/dashboard/';
    urlParams.searchParams.delete('redirect');
    window.history.pushState(null, 'redirect', urlParams.href);
    return redirect;
  }
	render() {
    // console.log('DashboardProps', this.props);
    // console.log('children', this.props.children);
    const {
      currentUser,
      collapsed,
      // match,
      location,
      fetchingNotices,
      notices,
      systemName
    } = this.props;
    // console.log(getRoutes(match.path, routerData));
    // const childRoute = getRoutes(match.path, routerData).map(item => {
    //               console.log('childRoute', item);
    //               return (
    //                 <AuthorizedRoute
    //                   key={item.key}
    //                   path={item.path}
    //                   component={item.component}
    //                   exact={item.exact}
    //                   authority={item.authority}
    //                   redirectPath='/exception/403'
    //                  />)
    //             }
    //           )
    // console.log(childRoute);
    // console.log(<Route path='/render/hi' render={() => <h1>Hi</h1>} />);
    const redirectRoute = redirectData.map(item =>
      <Redirect key={item.from} exact from={item.from} to={item.to} />
      )
    const bashRedirect = this.getBashRedirect();
    console.log('bashRedirect', bashRedirect);
    const layout = (
      <Layout>
        <Sider
          toggle
          foldSpan={{fold: '1', unfold: '19'}}
          onCollapse={onCollapse}
          style={{ background: '#2f323b' }}
          collapsed={collapsed}
        >
          <SiderMenu
            logo={logo}
            // 不带Authorized参数的情况下如果没有权限，会强制跳转到403页面
            // Authorized={Authorized}
            location={location}
            menuData={getMenuData()}
            collapsed={collapsed}
           />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }} >
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              systemName={systemName}
              routerPath={'版本管理'}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content>
            <Switch>
              <Route exact path='/dashboard' render={() => <h1>dashboard</h1>} />
              <Route path='/dashboard/version-manage' render={() => <h1>version-manag</h1>} />
              <Route path='/dashboard/demand-manage' render={() => <h1>demand-manage</h1>} />
              <Route path='/dashboard/scenario-manage' render={() => <h1>scenario-manage</h1>} />
              <Route path='/dashboard/user-case-manage' render={() => <h1>scenario-manage</h1>} />
              <Route path='/dashboard/business-tree' render={() => <h1>business-tree</h1>} />
              <Route path='/tasks/server-list' render={() => <h1>server-list</h1>} />
              <Route path='/tasks/task-list' render={() => <h1>task-list</h1>} />
              <Route path='/system/user-list' render={() => <h1>user-list</h1>} />
              <Route path='/system/basic-list' render={() => <h1>basic-list</h1>} />
              <Route path='/log/scenario-chart' render={() => <h1>scenario-chart</h1>} />
              <Route path='/log/user-case-chart' render={() => <h1>user-case-chart</h1>} />
              <Route path='/log/task-logo-search' render={() => <h1>task-logo-search</h1>} />
              <Route path='/log/check-log' render={() => <h1>check-log</h1>} />
              <Route path='/notfound' component={NotFound} />
              {/* { childRoute } */}
              {redirectRoute}
              <Redirect exact from='/' to={bashRedirect} />

            </Switch>
          </Content>
          {/* <Footer style={{ background: '#eee' }} /> */}
        </Layout>
      </Layout>
      )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        { layout }
      </DocumentTitle>
      )
	}
}

function onCollapse() {
  console.log('toggle sider')
}
