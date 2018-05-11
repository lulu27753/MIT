import React, { Component } from 'react';
import { Title, Grid } from 'components';
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
      id: props.id,
      currentCallCnt: '', // 当前通话人力
      currentIdleCnt: '', // 当前空闲人力
      todayTotalCiPremium: '', // 当日累计车险保费
      todayTotalCiCustCnt: '', // 当日累计车险标的数
      todayTotalCiAvgPremium: '', // 当日累计车险件均
      todayTotalNciPremium: '', // 当日累计非车保费
      realtimeEffecTalktime: '', // 人均实时有效通时(上一时段)
      todayTotalTalktime: '', // 人均当日累计通时
      realtimeEffecTalknum: '', // 人均实时有效通次(上一时段)
      todayTotalTalknum: '', // 人均当日累计通次
      realtimeAvgTalktime: '', // 人均实时平均通时(上一时段)
      todayTotalAvgTalktime: '', // 人均当日累计平均通时
    }
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
      this.handleRequestData(this.state.id)
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
        currentCallCnt: data.currentCallCnt,
        currentIdleCnt: data.currentIdleCnt,
        todayTotalCiPremium: '¥' + data.todayTotalCiPremium,
        todayTotalCiCustCnt: data.todayTotalCiCustCnt,
        todayTotalCiAvgPremium: data.todayTotalCiAvgPremium,
        todayTotalNciPremium: '¥' + data.todayTotalNciPremium,
        realtimeEffecTalktime: data.realtimeEffecTalktime + 'h',
        todayTotalTalktime: data.todayTotalTalktime + 'h',
        realtimeEffecTalknum: data.realtimeEffecTalknum,
        todayTotalTalknum: data.todayTotalTalknum,
        realtimeAvgTalktime: data.realtimeAvgTalktime + 'h',
        todayTotalAvgTalktime: data.todayTotalAvgTalktime + 'h'
      })
  }

  // 获取数据
  handleRequestData(id) {
    services.get(urls.queryTeamIndex, {umId: id}, this.handleGetData)
  }

  render () {
    return (
      <div className={styles.dataContainer}>
        <Row className={styles.row}>
          {/* 工作指标区域 */}
          <Col span={5} className={styles.workCol}>
            <div className={styles.workContainer}>
              <div>
                <Title className={styles.work} title='工作指标' />
              </div>
              <div className={styles.embarkationContainer}>
                <div className={styles.embarkation}>
                  <Indicator title='当前通话人力' style={{ height: 80 }} data={this.state.currentCallCnt} />
                </div>
                <div className={styles.embarkation}>
                  <Indicator title='当前空闲人力' style={{ height: 80 }} data={this.state.currentIdleCnt} />
                </div>
              </div>
            </div>
          </Col>
          {/* 业绩指标区域 */}
          <Col span={5} className={styles.perforCol}>
            <div className={styles.perforContainer}>
              <div>
                <Title className={styles.work} title='业绩指标' />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险保费' width='60%' style={{height: 34}} data={this.formatNumber(this.state.todayTotalCiPremium)} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险标的数' width='62%' style={{height: 34}} data={this.state.todayTotalCiCustCnt} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险件均' data={this.state.todayTotalCiAvgPremium} width='60%' style={{height: 34}} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计非车险保费' data={this.formatNumber(this.state.todayTotalNciPremium)} width='65%' style={{height: 34}} />
              </div>
            </div>
          </Col>
          {/* 话务指标区域 */}
          <Col span={15} className={styles.phoneCol}>
            <div className={styles.phoneContainer}>
              <Row>
                <div>
                  <Title className={styles.work} title='话务指标' />
                </div>
                <Col span={12}>
                  <div className={styles.leftContent}>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时平均通时(上一时段)' width='80%' style={{height: 48}} data={this.state.realtimeAvgTalktime} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时有效通时(上一时段)' width='80%' style={{height: 48}} data={this.state.realtimeEffecTalktime} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计通时' width='80%' style={{height: 48}} data={this.state.todayTotalTalktime} />
                    </div>
                  </div>
                </Col>
                <Col span={11} offset={1}>
                  <div className={styles.rightContent}>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计平均通时' width='80%' style={{height: 48}} data={this.state.todayTotalAvgTalktime} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时有效通次(上一时段)' width='80%' style={{height: 48}} data={this.state.realtimeEffecTalknum} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计通次' width='80%' style={{height: 48}} data={this.state.todayTotalTalknum} />
                    </div>
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
