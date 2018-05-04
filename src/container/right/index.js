import React, { Component } from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from 'component/tree-menu';
import RightHeader from 'component/right-header';
import Overlook from 'component/overlook'

// export default (props) => (
//   <Layout>
//     <Sider span={19}>
//       <TreeMenu />
//     </Sider>
//     <Layout>
//       <Content>
//         <RightHeader />
//         {console.log('props', props)}
//         <Overlook id={1} />
//       </Content>
//     </Layout>
//   </Layout>
// 	);

export default class right extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id
    }
  }

  toggleTeam (id) {
    this.setState({
      id: id
    })
  }

  render () {
    const { id } = this.state
    return (
      <Layout>
        <Sider span={19}>
          <TreeMenu onToggle={this.toggleTeam} />
        </Sider>
        <Layout>
          <Content>
            <RightHeader id={id} />
            <Overlook id={id} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
