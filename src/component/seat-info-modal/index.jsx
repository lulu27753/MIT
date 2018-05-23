import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Title, Grid, Divider } from 'components';
import layoutData from './layoutData'
import Info from 'component/Info';
import services from 'api/services';
import urls from 'api/urls';

import styles from './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

export default class SeatInfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  static propTypes = {
    umId: PropTypes.string,
    visible: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.umId && (nextProps.umId === this.props.umId)) {
      return false;
    } else {
      this.setState({
        umId: nextProps.umId
      }, () => {
        this.getData(nextProps.umId)
      })
    }
  }

  handleUpdateState = (data) => {
    this.setState({
      data: data
    })
  }

  getData = (umId) => {
    if (umId) {
      services.get(urls.querySeatIndex, {umId: umId}, this.handleUpdateState)
    }
  }

  handleCancel = () => {
      const { umId, handleModalStatus } = this.props
      if (typeof handleModalStatus === 'function') {
          const visible = false;
          handleModalStatus(umId, visible)
      }
  }

  // 解析layoutData生成dom
  generator = (data) => {
    let child = layoutData.map((item, index) => {
      console.log('item', item)
      return (
        <div key={item.header}>
          {item.header && <Row className={styles.row} ><Title title={item.header} style={{paddingLeft: '0'}} /></Row>}
          {item.content && this.handleContent(item.content, data)}
          {index !== layoutData.length - 1 && <Divider className={styles.divider} />}
        </div>
      )
    })
    return child
  }

  // 处理content类型
  handleContent = (content, data) => {
    if (content.children && content.children.length > 0) {
      return this.generatorContentList(content.children, data)
    } else {
      return <Row className={styles.row}>{this.generatorContent(content, data)}</Row>
    }
  }

  // 解析content生成dom
  generatorContent = (content, data) => {
    return content.map((item) => {
      let text;
      text = item.suffix && data[item.text] ? data[item.text] + item.suffix : data[item.text];
      text = item.mapData ? item.mapData[text] : text;
      return (
        <Col key={item.text} span={content.length <= 3 ? 8 : 6} className={styles.col}>
          <Info title={item.title} text={text} className={item.className} />
          {item.children && item.children(data)}
        </Col>
      )
    })
  }

  // 解析contentList
  generatorContentList = (contentList, data) => {
    return contentList.map((item, index) => {
      return (item && <Row key={index} className={styles.row}>{this.generatorContent(item, data)}</Row>)
    })
  }

  render() {
    const { visible } = this.props;
    const { data } = this.state;

    return (
      <Modal visible={visible} title='坐席详情' footer={null} onCancel={this.handleCancel} width={900} >
        {this.generator(data)}
      </Modal>
    )
  }
}
