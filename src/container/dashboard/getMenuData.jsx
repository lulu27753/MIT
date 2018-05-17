const menuData = [{
  name: '人员管理',
  icon: 'user-group',
  path: 'dashboard',
  children: [{
    name: '现场实时管理',
    path: 'version-manage',
  }],
},
// {
//     name: '业务洞见',
//     icon: 'pro-sharealt',
//     path: 'business',
//   }, {
//   name: '智能报表',
//   icon: 'pro-table',
//   path: 'report',
// }, {
//   name: '智能预警',
//   icon: 'pro-safety',
//   path: 'warnning',
// }
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




