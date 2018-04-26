import React from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import NotFound from 'container/NotFound';


import Layout from 'components/layout';

import SiderMenu from 'component/sider-menu';
import Authorized from 'component/authorized';
import GlobalHeader from 'component/globalHeader/index';

import { getMenuData } from './getMenuData';
import logo from 'assets/images/logo.png';
import { getRoutes } from 'utils/getRoutes';
import './dashboard.less';
// console.log('SiderMenu', SiderMenu);
const Sider = Layout.Sider
const Content = Layout.Content;
const Header = Layout.Header;
const Footer = Layout.Footer;
const AuthorizedRoute = Authorized.AuthorizedRoute;


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

export default class Dashboard extends React.Component {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'autoTest';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}-autoTest`;
    }
    return title;
  }
	render() {
    console.log('DashboardProps', this.props);
    // console.log('children', this.props.children);
    const {
      currentUser,
      collapsed,
      routerData,
      match,
      location,
      fetchingNotices,
      notices,
      systemName
    } = this.props;
    // console.log(getRoutes(match.path, routerData));
    const childRoute = getRoutes(match.path, routerData).map(item => {
                  console.log('childRoute', item);
                  return <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath='/exception/403'
                          />
                }
              )
    console.log(childRoute);
    console.log(<Route path='/render/hi' render={() => <h1>Hi</h1>} />);
    const layout = (
      <Layout>
        <Sider
          toggle
          foldSpan={{fold: '1', unfold: '19'}}
          onCollapse={onCollapse}
          style={{ background: '#2f323b' }}
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
              <Route path='/dashboard/version-manage' render={() => <h1>version-manag</h1>} />
              <Route path='/dashboard/demand-manage' render={() => <h1>demand-manage</h1>} />
              <Route path='/dashboard/user-case-manage' component={NotFound} />
              {/* { childRoute } */}
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
