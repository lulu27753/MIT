<<<<<<< HEAD
=======
import React from 'react';
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from 'component/tree-menu';
import RightHeader from 'component/right-header';
import Overlook from 'component/overlook'
import StandardTable from 'component/standard-table';

export default (props) => (
  <Layout>
    <Sider span={19}>
      <TreeMenu />
    </Sider>
    <Layout>
      <Content>
        <RightHeader />
        <Overlook id={1} />
        <StandardTable />
      </Content>
    </Layout>
  </Layout>
	);
>>>>>>> f-yy
