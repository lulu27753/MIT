import React, { PureComponent } from 'react';
import { Icon, Menu, Tag, Spin, Dropdown, Button, Divider } from 'components';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { getTodayTime } from 'utils/utils';

import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // 将 id 转换成 item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      // currentUser,
      systemName,
      routerPath,
      onMenuClick
    } = this.props;
    const currentUser = {
      name: 'NTMSOBTMR001'
    }
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type='user' />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type='setting' />设置
        </Menu.Item>
      </Menu>
    );
    const today = getTodayTime('today');
    return (
      <div className={styles.header}>
        <span className={styles.systemName} >
          {systemName}
        </span>
        <Divider type='vertical' style={{ fontSize: '20px' }} />
        <span className={styles.routerPath}>
          {routerPath}
        </span>
        <div className={styles.time}>
          {today}
        </div>
        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Icon type='user' className={styles.userIcon} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size='small' style={{ marginLeft: 8 }} />
            )}
          <Button type='quit' icon='logout' className={styles.quit} style={{ background: '#5093e1', color: '#fff' }} />
        </div>
      </div>
    );
  }
}
