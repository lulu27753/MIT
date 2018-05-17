const treeData = [{
  title: '上海-张江销售中心',
  number: 1200,
  key: '0',
  umId: '',
  children: [{
    title: '上海营区',
    number: 400,
    key: '0-0',
    umId: '',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-0-0',
      umId: '',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-0-0-0',
        umId: 'luxing001',
      }, {
        title: '韩寒座席组',
        number: 18,
        key: '0-0-0-1',
        umId: 'hanhan001',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-0-1',
      umId: '',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-0-1-0',
        umId: 'wangkun002',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-0-1-1',
        umId: 'songyaqiang002',
      }]
    }]
  }, {
    title: '江苏营区',
    number: 400,
    key: '0-1',
    umId: '',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-1-0',
      umId: '',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-1-0-1',
        umId: 'luxing003',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-1-1',
      umId: '',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-1-1-0',
        umId: 'wangkun003',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-1-1-1',
        umId: 'songyaqiang003',
      }]
    }]
  }, {
    title: '广西营区',
    number: 400,
    key: '0-2',
    umId: '',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '0-2-0',
      umId: '',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '0-2-0-0',
        umId: 'luxing004',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-2-1',
      umId: '',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-2-1-0',
        umId: 'wangkun005',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-2-1-1',
        umId: 'songyaqiang005',
      }]
    }]
  }]
}, {
  title: '成都销售中心',
  number: 398,
  key: '1',
  umId: '',
  children: [{
    title: '成都营区',
    number: 400,
    key: '1-0',
    umId: '',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '1-0-0',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '1-0-0-0',
        umId: 'luxing006',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-0-1',
      umId: '',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-0-1-0',
        umId: 'wangkun007',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-0-1-1',
        umId: 'songyaqiang007',
      }]
    }]
  }, {
    title: '江苏营区',
    number: 400,
    key: '1-1',
    umId: '',
    children: [{
      title: '一号楼-4楼-A区',
      number: 200,
      key: '1-1-0',
      umId: '',
      children: [{
        title: '陆星座席组',
        number: 18,
        key: '1-1-0-0',
        umId: 'luxing007',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-1-1',
      umId: '',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-1-1-0',
        umId: 'wangkun008',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-1-1-1',
        umId: 'songyaqiang008',
      }]
    }]
  }]
}, {
  title: '天津销售中心',
  number: 500,
  key: '2',
  umId: '',
}, {
  title: '广州销售中心',
  number: 400,
  key: '3',
  umId: '',
}]

export default {
  resultCode: '000000',
  resultMesg: '成功',
  data: treeData,
}
