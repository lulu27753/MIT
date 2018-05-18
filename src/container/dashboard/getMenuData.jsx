const menuData = [{
  name: '首页',
  icon: 'appstore-o',
  path: 'dashboard',
  children: [{
    name: '任务管理',
    path: 'task-list',
  }],
  }, {
  name: '个人中心',
  icon: 'user-group',
  path: 'user',
}, {
  name: 'NotFound',
  icon: 'warning-circle',
  path: 'notfound',
}
];
function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);




