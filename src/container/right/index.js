import React from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from 'component/tree-menu';
import RightHeader from 'component/right-header';
import Overlook from 'component/overlook'

export default (props) => (
  <Layout>
    <Sider span={19}>
      <TreeMenu />
    </Sider>
    <Layout>
      <Content>
        <RightHeader />
        <Overlook id={1} />
      </Content>
    </Layout>
  </Layout>
	);
