import React from 'react';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';



import Layout from 'components/layout';

import SiderMenu from 'component/sider-menu';
import GlobalHeader from 'component/global-header';
import Main from 'container/main/index.jsx';

import logo from 'assets/images/logo.png';
import { getMenuData } from './getMenuData';
import { getAuthority, setAuthority } from 'utils/localStorageAuthority';
import { getRedirect, redirectData } from 'utils/getRedirect';

import services from 'api/services';
import urls from 'api/urls';

import styles from './index.less';

const Sider = Layout.Sider;
const Content = Layout.Content;
const Header = Layout.Header;


// 根据菜单取得重定向地址
const menus = getMenuData();
// console.log('menus', menus);
menus.forEach(getRedirect);
console.log('redirectData', redirectData);

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      redirectTo: null,
      auth: '',
    }
  }

  componentDidMount() {
    // 从localstorerage里面获取授权
    let auth = getAuthority();
    console.log('auth', auth);
    // 将授权信息存储到context中
    this.setState({
      auth: auth
    })
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '产险线上化分析平台';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }
  getBashRedirect() {
    // 重定向到url的redirect参数所示地址
    const urlParams = new URL(window.location.href);
    const redirect = urlParams.searchParams.get('redirect') || '/dashboard/';
    urlParams.searchParams.delete('redirect');
    window.history.pushState(null, 'redirect', urlParams.href);
    return redirect;
  }
  logoutSuccess = (data) => {
    // console.log(data)
    // 清除auth
    setAuthority('')
    this.setState({
      redirectTo: '/login'
    });
  }
  handleQuit = () => {
    // console.log('handleQuit', 'redirectTo: /login');
    services.get(urls.logout, {um: this.state.auth}, this.logoutSuccess)
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  }

	render() {
    const {
      currentUser,
      location,
      systemName
    } = this.props;
    const layout = (
      <Layout>
        <Sider
          collapsed={this.state.collapsed}
          span={{fold: '1', unfold: '10'}}
        >
          <SiderMenu
            logo={logo}
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
            <Main />
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


