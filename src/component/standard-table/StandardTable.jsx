import React, { Component } from 'react';
import { Title, Grid, Icon } from 'components';
import Indicator from '../indicator/index';
import services from 'api/services';
import urls from 'api/urls';

import styles from './index.less';

const Row = Grid.Row;
const Col = Grid.Col;

export default class StandardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: 'true',
      id: props.id,
      CURRENT_CALL_CNT: '', // 当前通话人力
      CURRENT_IDLE_CNT: '', // 当前空闲人力
      TODAY_TOTAL_CI_PREMIUM: '', // 当日累计车险保费
      TODAY_TOTAL_CI_CUST_CNT: '', // 当日累计车险标的数
      TODAY_TOTAL_CI_AVG_PREMIUM: '', // 当日累计车险件均
      TODAY_TOTAL_NCI_PREMIUM: '', // 当日累计非车保费
      REALTIME_EFFEC_TALKTIME: '', // 人均实时有效通时(上一时段)
      TODAY_TOTAL_TALKTIME: '', // 人均当日累计通时
      REALTIME_EFFEC_TALKNUM: '', // 人均实时有效通次(上一时段)
      TODAY_TOTAL_TALKNUM: '', // 人均当日累计通次
      REALTIME_AVG_TALKTIME: '', // 人均实时平均通时(上一时段)
      TODAY_TOTAL_AVG_TALKTIME: '', // 人均当日累计平均通时
    }
    this.handleRequestData = this.handleRequestData.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // 金额分位处理
 formatNumber(num) {
  const res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
       return $1 + ',';
     });
  })
  return res;
 }
  // 初始化判断是否有id
  componentWillMount() {
    if (this.state.id) {
      this.handleRequestData(this.state.id);
    }
  }
  // id存在时获取该团队坐席的指标
  componentWillReceiveProps(nextProps) {
    if (nextProps.id === this.state.id) {
      return false;
    } else {
      this.setState({ id: nextProps.id });
      this.handleRequestData(nextProps.id)
    }
    // 每五分钟调用一次接口
    this.timeId = setInterval(() => this.handleRequestData(this.state.id), 1000 * 60 * 5)
  }

  // 组件卸载时清楚定时器
  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  handleGetData = (data) => {
      this.setState({
        CURRENT_CALL_CNT: data.CURRENT_CALL_CNT,
        CURRENT_IDLE_CNT: data.CURRENT_IDLE_CNT,
        TODAY_TOTAL_CI_PREMIUM: '¥' + data.TODAY_TOTAL_CI_PREMIUM || '',
        TODAY_TOTAL_CI_CUST_CNT: data.TODAY_TOTAL_CI_CUST_CNT,
        TODAY_TOTAL_CI_AVG_PREMIUM: data.TODAY_TOTAL_CI_AVG_PREMIUM,
        TODAY_TOTAL_NCI_PREMIUM: '¥' + data.TODAY_TOTAL_NCI_PREMIUM || '',
        REALTIME_EFFEC_TALKTIME: data.REALTIME_EFFEC_TALKTIME || '' + 'h',
        TODAY_TOTAL_TALKTIME: data.TODAY_TOTAL_TALKTIME || '' + 'h',
        REALTIME_EFFEC_TALKNUM: data.REALTIME_EFFEC_TALKNUM,
        TODAY_TOTAL_TALKNUM: data.TODAY_TOTAL_TALKNUM,
        REALTIME_AVG_TALKTIME: data.REALTIME_AVG_TALKTIME || '' + 'h',
        TODAY_TOTAL_AVG_TALKTIME: data.TODAY_TOTAL_AVG_TALKTIME || '' + 'h'
      })
  }

  // 获取数据
  handleRequestData(id) {
    services.get(urls.queryTeamIndex, {umId: id}, this.handleGetData)
  }
  // 是否展开团队指标
  handleToggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render () {
    return (
      <div className={styles.dataContainer} style={{ height: this.state.expand ? '' : 50 }}>
        <div onClick={this.handleToggle}>
          <Icon className={styles.icon} type={this.state.expand ? 'down-circle-o' : 'up-circle-o'} />
        </div>
        <Row className={styles.row}>
          {/* 工作指标区域 */}
          <Col span={8} className={styles.workCol}>
            <div className={styles.workContainer}>
              <div>
                <Title className={styles.work} title='工作指标' />
              </div>
              <div className={styles.embarkationContainer} style={{ display: this.state.expand ? 'block' : 'none' }}>
                <div className={styles.embarkation}>
                  <Indicator title='当前通话人力' width='80%' style={{ height: 36 }} data={this.state.CURRENT_CALL_CNT} />
                </div>
                <div className={styles.embarkation}>
                  <Indicator title='当前空闲人力' width='80%' style={{ height: 36 }} data={this.state.CURRENT_IDLE_CNT} />
                </div>
              </div>
            </div>
          </Col>
          {/* 业绩指标区域 */}
          <Col span={16} className={styles.perforCol}>
            <div className={styles.perforContainer}>
              <Row>
                <div>
                  <Title className={styles.perforWork} title='业绩指标' />
                </div>
                <Col span={12} className={styles.perforCol} style={{ display: this.state.expand ? 'block' : 'none' }}>
                  <div className={styles.perforList}>
                    <Indicator title='当日累计车险保费' width='65%' style={{height: 36}} data={this.formatNumber(this.state.TODAY_TOTAL_CI_PREMIUM)} />
                  </div>
                  <div className={styles.perforList}>
                    <Indicator title='当日累计车险标的数' width='65%' style={{height: 36}} data={this.state.TODAY_TOTAL_CI_CUST_CNT} />
                  </div>
                </Col>
                <Col span={12} className={styles.ColCiAvg} style={{ display: this.state.expand ? 'block' : 'none' }}>
                  <div className={styles.perforList}>
                    <Indicator title='当日累计车险件均' data={this.state.TODAY_TOTAL_CI_AVG_PREMIUM} width='65%' style={{height: 36}} />
                  </div>
                  <div className={styles.perforList}>
                    <Indicator title='当日累计非车险保费' data={this.formatNumber(this.state.TODAY_TOTAL_NCI_PREMIUM)} width='65%' style={{height: 36}} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          {/* 话务指标区域 */}
          <Col span={this.state.expand ? 24 : 8} className={styles.phoneCol} style={{position: !this.state.expand ? 'absolute' : '', right: !this.state.expand ? '0' : '', top: !this.state.expand ? '0' : ''}}>
            <div className={styles.phoneContainer}>
              <Row>
                <div>
                  <Title className={styles.work} title='话务指标' />
                </div>
                <Col span={8} style={{ display: this.state.expand ? 'block' : 'none' }}>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均实时平均通时(上一时段)' width='80%' style={{height: 36}} data={this.state.REALTIME_AVG_TALKTIME} />
                  </div>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均实时有效通时(上一时段)' width='80%' style={{height: 36}} data={this.state.REALTIME_EFFEC_TALKTIME} />
                  </div>
                </Col>
                <Col span={8} className={styles.ColTalk} style={{ display: this.state.expand ? 'block' : 'none' }}>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均当日累计通时' width='80%' style={{height: 36}} data={this.state.TODAY_TOTAL_TALKTIME} />
                  </div>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均当日累计平均通时' width='80%' style={{height: 36}} data={this.state.TODAY_TOTAL_AVG_TALKTIME} />
                  </div>
                </Col>
                <Col span={8} className={styles.ColTalknum} style={{ display: this.state.expand ? 'block' : 'none' }}>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均实时有效通次(上一时段)' width='80%' style={{height: 36}} data={this.state.REALTIME_EFFEC_TALKNUM} />
                  </div>
                  <div className={styles.perAccumulate}>
                    <Indicator title='人均当日累计通次' width='80%' style={{height: 36}} data={this.state.TODAY_TOTAL_TALKNUM} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
