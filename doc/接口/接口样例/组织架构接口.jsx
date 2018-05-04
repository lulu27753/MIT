const treeData = [{
  title: '上海-张江销售中心',
  number: 1200,
  key: '0',
  children: [{
    title: '上海营区',
    number: 400,
    key: '0-0',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-0-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-0-0-0',
      }, {
        title: '韩寒座席组',
        number: 18,
        key: '0-0-0-1',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-0-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-0-1-0',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-0-1-1',
      }]
    }]
  }, {
    title: '江苏营区',
    number: 400,
    key: '0-1',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-1-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-1-0-1',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-1-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-1-1-0',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-1-1-1',
      }]
    }]
  }, {
    title: '广西营区',
    number: 400,
    key: '0-2',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-2-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-2-0-0',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-2-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-2-1-0',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-2-1-1',
      }]
    }]
  }]
}, {
  title: '成都销售中心',
  number: 398,
  key: '1',
  children: [{
    title: '成都营区',
    number: 400,
    key: '1-0',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '1-0-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '1-0-0-0',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-0-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-0-1-0',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-0-1-1',
      }]
    }]
  }, {
    title: '江苏营区',
    number: 400,
    key: '1-1',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '1-1-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '1-1-0-0',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-1-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-1-1-0',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-1-1-1',
      }]
    }]
  }]
}, {
  title: '天津销售中心',
  number: 500,
  key: '2',
}, {
  title: '广州销售中心',
  number: 400,
  key: '3',
}]
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
