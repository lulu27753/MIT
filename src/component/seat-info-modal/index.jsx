import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Title, Grid } from 'components';
import Indicator from 'component/indicator'
// import axios from 'axios';
import data from 'doc/interface/example/seatIndexQuery'

import styles from './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

export default class SeatInfoModal extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      umId: props.umId,
      visible: props.visible,
      data: {}
    }
  }

  static propTypes = {
    umId: PropTypes.string,
    visible: PropTypes.bool
  }

  componentWillMount () {
    this.setState({
      data: data.data
    })
  }

  handleCancel = () => {
      const { umId, handleModalStatus } = this.props
      if (typeof handleModalStatus === 'function') {
          handleModalStatus(umId, false)
      }
  }

  render() {
    const { visible } = this.props;
    const { data } = this.state;

    return (
      <Modal visible={visible} title='坐席详情' footer={null} onCancel={this.handleCancel} width={800} >
        <Row className={styles.row} >
          <Title title='基本信息' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.col}>
            <Indicator title='姓名' data={data.name} />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='司龄' data={data.onboardCnt} />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='坐席业务模式' data={data.tmrBusinessModeCode} />
          </Col>
          <Col span={6} >
            <Indicator title='职级描述' data={data.positionTypeDesc} />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日工作情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8}>
            <Indicator title='是否话务活跃' data={data.isActive} />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日业绩情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计车险保费' data={data.todayTotalCiPreminm} />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计核保通过客户数' data={data.securityThroughCustCnt} width='70%' />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计非车保护费' data={data.todayTotalNciPremium} />
          </Col>
        </Row>
        <br />
        <Row className={styles.row}>
          <Title title='当日话务情况' style={{paddingLeft: '0'}} />
        </Row>
        {/* <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计首播名单量' data={data.name} />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计拨打名单量' data={data.name} />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计预约名单量' data={data.name} />
          </Col>
        </Row> */}
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='实时有效通时(上一时段)' data={data.refaltimeEffecTalkTime} width='75%' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='实时有效通次(上一时段)' data={data.refaltimeEffecTalkNum} width='75%' />
          </Col>
          <Col span={8}>
            <Indicator title='实时平均通时(上一时段)' data={data.refaltimeAvgTalkTime} width='75%' />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通时' data={data.todayTotalTalkTime} />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通次' data={data.todayTotalTalkNum} />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计平均通时' data={data.todayTotalAvgTalkTime} />
          </Col>
        </Row>
      </Modal>
    )
  }
}
