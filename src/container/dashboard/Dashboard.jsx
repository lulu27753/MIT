import React from 'react';
import { Layout } from 'components';

import Menu from 'components/menu';
import Icon from 'components/icon';
import menuData, {getMenuPath} from './getMenuData';
import GlobalHeader from 'component/globalHeader/index';
import logo from 'assets/images/logo.png'

import './dashboard.less';

const SubMenu = Menu.SubMenu;
const defaultOpenMenu = menuData[0].path;

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export default class Dashboard extends React.Component {
  state = {
    current: 'platform',
    defaultOpenKeys: [defaultOpenMenu]
  }
  handleClick = (e) => {
    const currentPath = getMenuPath(e.keyPath[1], e.keyPath[0]);
    // console.log('currentPath', currentPath);
    this.props.history.push(currentPath);
    this.setState({
      current: e.key,
    });
  }

	render() {
    const {
      currentUser,
      fetchingNotices,
      notices
    } = this.props;

    const submenu = menuData.map((menu) => {
      return (
        <SubMenu key={menu.path} title={<span><Icon type={menu.icon} />{menu.name}</span>}>
          {
            menu.children.map((item) => (
              <Menu.Item key={item.path}>{item.name}</Menu.Item>
              )
            )
          }
        </SubMenu>
              )
    });
    const {current, defaultOpenKeys} = this.state;
		return (
  <div className='dashboard'>
    <Layout>
      <Sider toggle foldSpan={{fold: '1', unfold: '19'}} onCollapse={onCollapse}>
        <Menu
          theme={'light'}
          onClick={this.handleClick}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[current]}
          mode='inline'
          >
          {submenu}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }} >
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            systemName={'自动化测试平台'}
            routerPath={'版本管理'}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
        </Header>
        <Content />
        <Footer style={{ background: '#eee' }} />
      </Layout>
    </Layout>
  </div>
		);
	}
}

function onCollapse() {
  console.log('toggle sider')
}
