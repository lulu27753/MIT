---
title: treeMenu
name: 树形菜单
---

通常作为数据结构为树形结构的完整展现层级关系的

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
link | shi | string | -默认单层，双层为double
currentUser | 当前用户的信息 | object | -{name: 'jack'}
systemName | 系统名称 | string | -
routerPath | 当前路由名称 | string | -
leftChildren | 双层结构下左下角dom元素 | node | -
centerChildren | 中间dom元素,默认为当前日期信息 | node | -
onMenuClick | 点击用户名下拉单选项时间 | function |

支持Dbox UI 中Tree组件中所有的API
