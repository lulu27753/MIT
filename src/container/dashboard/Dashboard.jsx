import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';



import Layout from 'components/layout';

import SiderMenu from 'component/sider-menu';
import GlobalHeader from 'component/global-header';
import Main from 'container/main';

import data from '../../data';
import logo from 'assets/images/logo.png';
import { getMenuData } from './getMenuData';
import { getAuthority, setAuthority } from 'utils/localStorageAuthority';
import { getRedirect } from 'utils/getRedirect';

import services from 'api/services';
import urls from 'api/urls';
import jsonpCMT from 'api/burialPoint';

import styles from './index.less';

const Sider = Layout.Sider;
const Content = Layout.Content;
const Header = Layout.Header;


// 根据菜单取得重定向地址
const menus = getMenuData();
// console.log('menus', menus);
menus.forEach(getRedirect);


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      redirectTo: null,
      auth: '',
      url: ''
    }
    this.getAssitSignature = this.getAssitSignature.bind(this)
  }

  componentDidMount() {
    // 从localstorerage里面获取授权
    // console.log('match', this.props.match)
    let auth = getAuthority();
    console.log('auth', auth);
    // 将授权信息存储到context中
    this.setState({
      auth: auth
    })
    // 埋点信息(判断是否登陆成功)
    if (!localStorage.getItem('idoll-pro-authority')) {
      return false;
    } else {
      services.get('peopleManagement/assitSignature.do', this.getAssitSignature)
    }
  }

  getAssitSignature(data) {
    this.setState({url: data.url});
    const params = {pwd: data.pwd};
    const option = {
      param: 'callback',
      timeout: 10000
    }
    const objParamsLogin = {
      url: data.url,
      params: params,
      option: option,
      type: 'login'
    }
    // const objParamsActive = {
    //   url: data.url,
    //   option: 'activeCallback',
    //   type: 'active'
    // }
    jsonpCMT.writeLogLogin(objParamsLogin);
    // this.timeId = setInterval(() => jsonpCMT.writeLogActive(objParamsActive), 1000 * 60 * 10)
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = data.common.systemName;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
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
    services.get(urls.logout, {umId: this.state.auth}, this.logoutSuccess)
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
            onCollapse={this.onCollapse}
            toggle
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
            />
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/dashboard' component={Main} />
              <Route path='/dashboard/version-manage' component={Main} />
            </Switch>
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


