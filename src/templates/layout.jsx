import React from 'react'
import { Layout } from 'components'

import styles from './layout.less'

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function onCollapse() {
  console.log('toggle sider')
}

const MainLayout = () => (
  <div id='main-container'>
    <h1 className='h1'>排版1</h1>
    <div className={styles.layout_temp}>
      <Layout>
        <Sider />
        <Layout>
          <Header style={{ background: '#eee' }} />
          <Content />
          <Footer style={{ background: '#eee' }} />
        </Layout>
      </Layout>
    </div>
    <br />
    <h1 className='h1'>排版2</h1>
    <div className={styles.layout_temp}>
      <Layout>
        <Header style={{ background: '#eee' }} />
        <Content />
        <Footer style={{ background: '#eee' }} />
      </Layout>
    </div>
    <br />
    <h1 className='h1'>排版3 左菜单栏可缩进</h1>
    <div className={styles.layout_temp} style={{width: '900px', height: '800px'}} >
      <Layout>
        <Sider toggle foldSpan={{fold: '1', unfold: '19'}} onCollapse={onCollapse} />
        <Layout>
          <Header style={{ background: '#eee' }} />
          <Content />
          <Footer style={{ background: '#eee' }} />
        </Layout>
      </Layout>
    </div>
  </div>
)

export default MainLayout;
