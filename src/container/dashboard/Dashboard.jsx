import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title';



import Layout from 'components/layout';

import SiderMenu from 'component/sider-menu';
// import Authorized from 'component/authorized';
import GlobalHeader from 'component/global-header';
import Main from 'container/main';

import logo from 'assets/images/logo.png';
// import { getRoutes } from 'utils/getRoutes';
import { getMenuData } from './getMenuData';
import TreeMenuRoutes from '../../router/treeMenu';
import { getAuthority } from 'utils/localStorageAuthority';
import { getRedirect, redirectData } from 'utils/getRedirect';

import styles from './index.less';

const Sider = Layout.Sider
const Content = Layout.Content;
const Header = Layout.Header;

// const AuthorizedRoute = Authorized.AuthorizedRoute;


// 根据菜单取得重定向地址
const menus = getMenuData();
console.log('menus', menus);
menus.forEach(getRedirect);
console.log('redirectData', redirectData);
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      redirectTo: null,
    }
  }
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  getChildContext() {
    const { location, routerData } = this.props;
    console.log('routerData', routerData);

    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    // 从localstorerage里面获取授权
    let auth = getAuthority();
    console.log('auth', auth);
    // 将授权信息存储到context中
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'autoTest';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
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
  handleQuit = () => {
    console.log('handleQuit', 'redirectTo: /login');
    this.setState({
      redirectTo: '/login'
    });
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
    console.log('onCollapse', collapsed);
  }

	render() {
    // console.log('DashboardProps', this.props);
    // console.log('children', this.props.children);
    const {
      currentUser,
      // match,
      location,
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

    const redirectRoute = redirectData.map(item =>
      <Redirect key={item.from} exact from={item.from} to={item.to} />
      )
    const bashRedirect = this.getBashRedirect();
    // console.log('bashRedirect', bashRedirect);
    const layout = (
      <Layout>
        <Sider
          span={{fold: '1', unfold: '10'}}
          onCollapse={this.handleMenuCollapse}
        >
          <SiderMenu
            logo={logo}
            // 不带Authorized参数的情况下如果没有权限，会强制跳转到403页面
            // Authorized={Authorized}
            location={location}
            menuData={getMenuData()}
            collapsed={this.state.collapsed}
           />
        </Sider>
        <Layout>
          <Header className={styles.header} >
            <GlobalHeader
              currentUser={currentUser}
              systemName={systemName}
              routerPath={this.getPageTitle()}
              onQuit={this.handleQuit}
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              toggle
            />
          </Header>
          <Content className={styles.content}>
            <Switch>
              {/* <Route exact path='/dashboard' component={TreeMenu} /> */}
              {/* <Route path='/dashboard/version-manage' render={() => <TreeMenu />} /> */}
              <Route path='/dashboard/demand-manage' render={() => <Main><TreeMenuRoutes /></Main>} />
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
              <Route render={() => <Main><TreeMenuRoutes /></Main>} />
              {/* { childRoute } */}
              {redirectRoute}
              <Redirect exact from='/' to={bashRedirect} />
            </Switch>
            {/* <TreeMenu /> */}
          </Content>
        </Layout>
      </Layout>
      )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        {this.state.redirectTo ? <Redirect to={this.state.redirectTo} /> : layout }
      </DocumentTitle>
      )
	}
}


