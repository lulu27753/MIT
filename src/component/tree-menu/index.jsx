import React from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from './TreeMenu';

export default (props) => (
  <Layout>
    <Sider span={19}>
      <TreeMenu />
    </Sider>
    <Layout>
      <Content>{props.children}</Content>
    </Layout>
  </Layout>
	);
