import React, { Component } from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from 'component/tree-menu';
import RightHeader from 'component/right-header';
import Overlook from 'component/overlook';
// import StandardTable from 'component/standard-table'

import styles from './index.less'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id
    }
  }

  toggleTeam = (id) => {
    // console.log('teamId', id)
    this.setState({
      id: id
    })
  }

  render () {
    const { id } = this.state;
    return (
      <Layout className={styles.main} >
        <Sider span={19}>
          <TreeMenu onToggle={this.toggleTeam} />
        </Sider>
        <Layout className={styles.main_right}>
          <Content style={{position: 'relative'}}>
            <RightHeader id={id} />
            <Overlook id={id} />
            {/* <StandardTable id={id} /> */}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
