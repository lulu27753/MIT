import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

import Tree from 'components/tree';
import Input from 'components/input';
import gData, { dataList, getParentKey } from './treeData'

import styles from './index.less';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;


console.log('gData', gData);
console.log('dataList', dataList);

export default class TreeMenu extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true
  }
  onExpand = (expandedKeys) => {
    this.setState({expandedKeys, autoExpandParent: false}, () => {
    console.log(expandedKeys);
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({expandedKeys, searchValue: value, autoExpandParent: true});
  }
  render() {
  const {searchValue, expandedKeys, autoExpandParent} = this.state;
  const loop = data => data.map((item) => {
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const title = index > -1
      ? (
        <span>
          {beforeStr}
          <span style={{
            color: '#f50'
          }}>{searchValue}</span>
          {afterStr} ({item.number})
        </span>
      )
  : <span>{item.title} ({item.number})</span>;
    if (item.children) {
      return (
        <TreeNode key={item.key} title={title}>
          {loop(item.children)}
        </TreeNode>
      );
    }
return <TreeNode key={item.key} title={<Link to={`/dashboard/version-manage/${item.key}`}>{title}</Link>} />;
});
    return (
      <div className={styles.tree}>
        <Search style={{ marginBottom: 8 }} placeholder='搜索职场' onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}

=======
import Layout, { Sider, Content } from 'components/layout';
import TreeMenu from './TreeMenu';

export default (props) => (
  <Layout>
    <Sider span={19}>
      <TreeMenu onToggle={onToggle} />
    </Sider>
    <Layout>
      <Content>{props.children}</Content>
    </Layout>
  </Layout>
	);
function onToggle(key) {
  console.log('key', key);
}
>>>>>>> f944c34b9bcdf006a7d52d1a5065637905e847ff
