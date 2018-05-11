import React from 'react';
import { Link } from 'react-router-dom';

import Tree from 'components/tree';
import Input from 'components/input';

import { generateList, getParentKey } from './util'
import services from 'api/services';
import urls from 'api/urls';
import styles from './index.less';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class TreeMenu extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    gData: [],
    dataList: [],
  }
  static defaultProps = {
    searchColor: '#f50'
  }
  componentDidMount() {
    services.get(urls.queryOrganization, {}, this.getData);
  }
  getData = (treeData) => {
    this.setState({
      gData: treeData,
      dataList: generateList(treeData),
    }, () => {
      // console.log(this.state.gData)
    })
  }
  onExpand = (expandedKeys) => {
    this.setState({expandedKeys, autoExpandParent: false}, () => {
    // console.log('expandedKeys', expandedKeys);
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = this.state.dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, this.state.gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({expandedKeys, searchValue: value, autoExpandParent: true});
  }
  onSelect = (selectedKeys) => {
    this.props.onToggle(selectedKeys)
  }
  render() {
  const { searchValue, expandedKeys, autoExpandParent, gData } = this.state;
  const { link, parentpath, searchColor } = this.props;
  const loop = data => data.map((item) => {
    const key = item.um || item.key;
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const title = index > -1
      ? (
        <span>
          {beforeStr}
          <span style={{
            color: searchColor
          }}>{searchValue}</span>
          {afterStr} ({item.number})
        </span>
      )
  : <span>{item.title} ({item.number})</span>;
    if (item.children) {
      return (
        <TreeNode key={key} title={title}>
          {loop(item.children)}
        </TreeNode>
      );
    }
return <TreeNode key={key} title={link ? <Link to={`${parentpath}/${key}`}>{title}</Link> : title} />;
});
    return (
      <div className={styles.tree}>
        <Search style={{ marginBottom: 8 }} placeholder='搜索职场' onChange={this.onChange} />
        <Tree
          {...this.props}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}

