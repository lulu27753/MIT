import React from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from './TreeMenu';

export default (props) => (
  <Layout>
    <Sider>
      <TreeMenu />
    </Sider>
    <Layout>
      <Content />
      <Content>{props.children}</Content>
    </Layout>
  </Layout>
	);
