import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Title, Grid, Divider, Icon, Tooltip } from 'components';
import Indicator from 'component/indicator';
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
      data: data || {}
    })
  }

  getData = (umId) => {
    if (umId) {
      // console.log('umId2', umId);
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

  render() {
    const { visible } = this.props;
    const { data } = this.state;

    return (
      <Modal visible={visible} title='坐席详情' footer={null} onCancel={this.handleCancel} width={880} >
        <Row className={styles.row} >
          <Title title='基本信息' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={6} className={styles.col}>
            <Indicator title='姓名' data={data.TMR_NAME} />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='司龄' data={data.ONBOARD_AGE + '月'} />
          </Col>
          <Col span={6} className={styles.col}>
            <Indicator title='坐席业务模式' data={data.TMR_TYPE} />
          </Col>
          <Col span={6} >
            <Indicator title='职级描述' width='40%' data={data.POSITION_NAME} />
          </Col>
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.row}>
          <Title title='当日工作情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8}>
            <Indicator title='是否话务活跃' data={data.IS_ACTIVE === 1 ? '是' : '否'} />
          </Col>
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.row}>
          <Title title='当日业绩情况' style={{paddingLeft: '0'}} />
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计车险保费' data={data.TODAY_TOTAL_CI_PREMIUM + '元'} />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计核保通过客户数' data={data.SECURITY_THROUGH_CUST_CNT} width='70%' />
          </Col>
          <Col span={8}>
            <Indicator title='当日累计非车保护费' data={data.TODAY_TOTAL_NCI_PREMIUM + '元'} />
          </Col>
        </Row>
        <Divider className={styles.divider} />
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
            <Indicator title='实时有效通时(上一时段)' data={data.REALTIME_EFFEC_TALKTIME + 'h'} width='75%' />
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='实时有效通次(上一时段)' data={data.REALTIME_EFFEC_TALKNUM} width='75%' />
          </Col>
          <Col span={8}>
            <Indicator title='实时平均通时(上一时段)' data={data.REALTIME_AVG_TALKTIME + 'h'} width='75%' />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通时' data={data.TODAY_TOTAL_TALKTIME} />
            <Tooltip placement='right' title={`昨日累计通时 ${data.LAST_SUM_TIME + 'h'}`}>
              <Icon type={data.TODAY_TOTAL_TALKTIME > data.LAST_SUM_TIME ? 'arrowup' : 'arrowdown'}
                className={styles.fixIcon}
              />
            </Tooltip>
          </Col>
          <Col span={8} className={styles.col}>
            <Indicator title='当日累计通次' data={data.TODAY_TOTAL_TALKNUM} />
            <Tooltip placement='right' title={`昨日累计通次 ${data.LAST_SUM_COUNT}`}>
              <Icon type={data.todayTotalTalkNum >= data.LAST_SUM_COUNT ? 'arrowup' : 'arrowdown'} className={styles.fixIcon} />
            </Tooltip>
          </Col>
          <Col span={8}>
            <Indicator title='当日累计平均通时' data={data.TODAY_TOTAL_AVG_TALKTIME} />
            <Tooltip placement='right' title={`昨日累计平均通时 ${data.LAST_SUM_AVG + 'h'}`}>
              <Icon type={data.TODAY_TOTAL_AVG_TALKTIME > data.LAST_SUM_AVG ? 'arrowup' : 'arrowdown'} className={styles.fixIcon} style={{ right: '8px' }} />
            </Tooltip>
          </Col>
        </Row>
      </Modal>
    )
  }
}
