import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { Modal, Title, Grid } from 'components';
import Indicator from 'component/indicator'
// import axios from 'axios';

import styles from './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

export default class SeatInfoModal extends Component {
    // constructor(props) {
    //   super(props)
    //   console.log('props', props)
    //   this.state = {
    //     umId: props.umId,
    //     visible: props.visible
    //   }
    //   console.log('state', this.state)
    // }

    // static propTypes = {
    //   umId: PropTypes.string,
    //   visible: PropTypes.bool
    // }

    // handleOk = () => {
    //     const { umId, handleModalStatus } = this.props
    //     if (typeof handleModalStatus === 'function') {
    //         handleModalStatus(umId, false)
    //     }
    // }

  handleCancel = () => {
      const { umId, handleModalStatus } = this.props
      if (typeof handleModalStatus === 'function') {
          handleModalStatus(umId, false)
      }
  }
  render() {
    const { visible } = this.props;
    return (
      <Modal visible={visible} title='坐席详情' footer={null} onCancel={this.handleCancel} width={800} >
        <Row className={styles.row} >
          <Title title='基本信息' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.col}>
            <Indicator title='姓名' data='dada' />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='司龄' data='dada' />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='坐席业务模式' data='dada' />
          </Col>
          <Col span={6} >
            <Indicator title='职级描述' data='dada' />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日工作情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8}>
            <Indicator title='是否话务活跃' data='dada' />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日业绩情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计车险保费' data='dada' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计核保通过客户数' data='dada' width='70%' />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计非车保护费' data='dada' />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日话务情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计首播名单量' data='dada' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计拨打名单量' data='dada' />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计预约名单量' data='dada' />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='实时有效通时(上一时段)' data='dada' width='75%' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='实时有效通次(上一时段)' data='dada' width='75%' />
          </Col>
          <Col span={8}>
            <Indicator title='实时平均通时(上一时段)' data='dada' width='75%' />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通时' data='dada' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通次' data='dada' />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计平均通时' data='dada' />
          </Col>
        </Row>
      </Modal>
    )
  }
}
