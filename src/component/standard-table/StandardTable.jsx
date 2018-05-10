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
  return '¥' + res;
 }
  // 初始化数据
  componentWillMount() {
    this.handleRequestData(this.props.id);
  }
// 定时调用
  componentDidMount() {
    this.timeId = setInterval(() => this.handleGettingData(), 1000 * 60 * 5)
  }
  // 组件卸载时清楚定时器
  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  handleGetData = (data) => {
    this.setState(data)
  }

  // 获取数据
  handleRequestData(id) {
    services.get(urls.queryTeamIndex, {umId: id}, this.handleGetData)
  }

  render () {
    const {
      currentCallCnt,
      currentIdleCnt,
      todayTotalCiPremium,
      todayTotalCiCustCnt,
      todayTotalCiAvgPremium,
      todayTotalNciPremium,
      realtimeEffecTalktime,
      todayTotalTalktime,
      realtimeEffecTalknum,
      todayTotalTalknum,
      realtimeAvgTalktime,
      todayTotalAvgTalktime
    } = this.state;

    return (
      <div className={styles.dataContainer}>
        <Row>
          {/* 工作指标区域 */}
          <Col span={8} className={styles.workCol}>
            <div className={styles.workContainer}>
              <div>
                <Title className={styles.work} title='工作指标' />
              </div>
              <div className={styles.embarkationContainer}>
                <div className={styles.embarkation}>
                  <Indicator title='当前通话人力' style={{ height: 80 }} data={currentCallCnt} />
                </div>
                <div className={styles.embarkation}>
                  <Indicator title='当前空闲人力' style={{ height: 80 }} data={currentIdleCnt} />
                </div>
              </div>
            </div>
          </Col>
          {/* 话务指标区域 */}
          <Col span={8} className={styles.phoneCol}>
            <div className={styles.phoneContainer}>
              <Row>
                <div>
                  <Title className={styles.work} title='话务指标' />
                </div>
                <Col span={8}>
                  <div className={styles.leftContent}>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时平均通时(上一时段)' width='80%' style={{height: 48}} data={realtimeAvgTalktime + 'h'} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时有效通时(上一时段)' width='80%' style={{height: 48}} data={realtimeEffecTalktime + 'h'} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计通时' width='80%' style={{height: 48}} data={todayTotalTalktime + 'h'} />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.rightContent}>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计平均通时' width='80%' style={{height: 48}} data={todayTotalAvgTalktime + 'h'} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均实时有效通次(上一时段)' width='80%' style={{height: 48}} data={realtimeEffecTalknum + 'h'} />
                    </div>
                    <div className={styles.perAccumulate}>
                      <Indicator title='人均当日累计通次' width='80%' style={{height: 48}} data={todayTotalTalknum} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          {/* 业绩指标区域 */}
          <Col span={8} className={styles.perforCol}>
            <div className={styles.perforContainer}>
              <div>
                <Title className={styles.work} title='业绩指标' />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险保费' width='60%' style={{height: 34}} data={this.formatNumber(todayTotalCiPremium)} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险标的数' width='62%' style={{height: 34}} data={todayTotalCiCustCnt} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计车险件均' data={todayTotalCiAvgPremium} width='60%' style={{height: 34}} />
              </div>
              <div className={styles.perforList}>
                <Indicator title='当日累计非车险保费' data={this.formatNumber(todayTotalNciPremium)} width='65%' style={{height: 34}} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
