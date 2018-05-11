import organizationSource from 'doc/interface/example/organizationQuery'
import services from 'api/services';
import urls from 'api/urls';

function getData(data) {
  // console.log('treeData', data)
}
// const treeData = []
const treeData = organizationSource.data
services.get(urls.queryOrganization, {}, getData)
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    const title = node.title;
    const number = node.number;
    dataList.push({ key, title, number });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(treeData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


export default treeData;
export { dataList, getParentKey };

