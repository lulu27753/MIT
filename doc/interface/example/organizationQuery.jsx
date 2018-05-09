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
        umid: 'luxing001',
      }, {
        title: '韩寒座席组',
        number: 18,
        key: '0-0-0-1',
        umid: 'hanhan001',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-0-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-0-1-0',
        umid: 'wangkun002',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-0-1-1',
        umid: 'songyaqiang002',
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
        umid: 'luxing003',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-1-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-1-1-0',
        umid: 'wangkun003',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-1-1-1',
        umid: 'songyaqiang003',
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
        umid: 'luxing004',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '0-2-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '0-2-1-0',
        umid: 'wangkun005',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '0-2-1-1',
        umid: 'songyaqiang005',
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
        umid: 'luxing006',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-0-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-0-1-0',
        umid: 'wangkun007',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-0-1-1',
        umid: 'songyaqiang007',
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
        umid: 'luxing007',
      }]
    }, {
      title: '一号楼-4楼-B区',
      number: 200,
      key: '1-1-1',
      children: [{
        title: '王坤座席组',
        number: 18,
        key: '1-1-1-0',
        umid: 'wangkun008',
      }, {
        title: '宋亚强座席组',
        number: 30,
        key: '1-1-1-1',
        umid: 'songyaqiang008',
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

export default {
  resultCode: '000000',
  resultMesg: '成功',
  data: treeData,
}
