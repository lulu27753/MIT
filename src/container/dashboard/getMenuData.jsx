const menuData = [{
  name: '人员管理',
  icon: 'user-group',
  path: 'dashboard',
  children: [{
    name: '现场实时管理',
    path: 'version-manage',
  }, {
    name: '需求管理',
    path: 'demand-manage',
  }, {
    name: '场景管理',
    path: 'scenario-manage',
  }, {
    name: '用例管理',
    path: 'user-case-manage',
  }, {
    name: '业务树',
    path: 'business-tree',
    hideInMenu: true, // 不在菜单中显示
    // target: '_blank', // 当path是http链接时，使用该参数
  }],
}, {
  name: '业务洞见',
  icon: 'appstore-o',
  path: 'tasks',
  children: [{
    name: '执行机管理',
    path: 'server-list',
  }, {
    name: '任务管理',
    path: 'task-list',
  }],
}, {
  name: '智能报表',
  icon: 'edit',
  path: 'system',
  children: [{
    name: '用户管理',
    path: 'user-list',
  }, {
    name: '字典管理',
    path: 'basic-list',
  }],
}, {
  name: '信息安全',
  icon: 'copy',
  path: 'log',
  // authority: 'guest',
  children: [{
    name: '场景统计图',
    path: 'scenario-chart',
  }, {
    name: '用例统计图',
    path: 'user-case-chart',
  }, {
    name: '任务日志查询',
    path: 'task-logo-search',
  }, {
    name: '检查点日志',
    path: 'check-log',
  }],
}, {
  name: '业绩看板',
  icon: 'achievement',
  path: 'achievement',
  // authority: 'guest',
  children: [{
    name: '场景统计图',
    path: 'scenario-chart',
  }, {
    name: '用例统计图',
    path: 'user-case-chart',
  }, {
    name: '任务日志查询',
    path: 'task-logo-search',
  }, {
    name: '检查点日志',
    path: 'check-log',
  }],
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




