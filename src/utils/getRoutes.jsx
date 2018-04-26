function getRelation(str1, str2) {
  // console.log('str1', str1);
  // console.log('str2', str2);
  if (str1 === str2) {
    console.warn('两个路径相等！');
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  // 两个路由没有父子关系
  return 3;
}

export function getRoutes(path, routerData) {
  // 筛选出子路由
  let routes = Object.keys(routerData).filter((routePath) => (
      routePath.indexOf(path) === 0 && routePath !== path
    ));
  routes = routes.map(item => {
    // console.log('item', item);
    return item.replace(path, '')
  });
  // console.log('routes', routes);

  let renderArr = [];
  renderArr.push(routes[0]);

  for (let i = 1; i < routes.length; i++) {
    let isAdd = false;
    isAdd = renderArr.every(item => {
          // console.log('renderArr_item', item);
          // console.log('routes[i]', routes[i]);
          return getRelation(item, routes[i]) === 3
        }
      );
    // console.log('isAdd', isAdd);
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);

    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    // console.log('renderRoutes_item', path);
    // console.log('renderRoutes_item', item);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    }
  })

  return renderRoutes;
}
