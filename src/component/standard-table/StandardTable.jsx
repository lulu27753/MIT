import React, { Component } from 'react';
import { message, Title } from 'components';
import Indicator from '../indicator/index';
import axios from 'axios';
// import data from 'doc/interface/example/teamIndexQuery.jsx';
import styles from './index.less';

export default class StandardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCallCnt: '', // 当前通话人力
      currentIdleCnt: '', // 当前空闲人力
      todayTotalCiPremium: '', // 当日累计车险保费
      todayTotalCiCustCnt: '', //当日累计车险标的数
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
  // 初始化数据
  componentWillMount() {
    this.handleGettingData();
  }
// 定时调用
  componentDidMount() {
    this.timeId = setInterval(() => this.handleGettingData(), 1000 * 60 * 5)
  }
  // 组件卸载时清楚定时器
  componentWillUnmount() {
    clearInterval(this.timeId);
  }
  // 获取数据
  handleGettingData() {
    axios.get(' https://www.easy-mock.com/mock/5aeaa808da989d5256368147/onlinManage/data_monitoring')
    .then((res) => {
      const resultCode = res.data.resultCode;
      const resultMesg = res.data.resultMesg;
      if (resultCode === '000000') {
        const data = res.data.data;
        this.setState({
          currentCallCnt: data.currentCallCnt,
          currentIdleCnt: data.currentIdleCnt,
          todayTotalCiPremium: data.todayTotalCiPremium,
          todayTotalCiCustCnt: data.todayTotalCiCustCnt,
          todayTotalCiAvgPremium: data.todayTotalCiAvgPremium,
          todayTotalNciPremium: data.todayTotalNciPremium,
          realtimeEffecTalktime: data.realtimeEffecTalktime + 'h',
          todayTotalTalktime: data.todayTotalTalktime + 'h',
          realtimeEffecTalknum: data.realtimeEffecTalknum + 'h',
          todayTotalTalknum: data.todayTotalTalknum,
          realtimeAvgTalktime: data.realtimeAvgTalktime,
          todayTotalAvgTalktime: data.todayTotalAvgTalktime + 'h'
        })
      } else {
        message.error(resultMesg)
      }
    })
  }
  render () {
    return (
      <div className={styles.dataContainer}>
        {/* 工作指标区域 */}
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
        {/* 话务指标区域 */}
        <div className={styles.phoneContainer}>
          <div>
            <Title className={styles.work} title='话务指标' />
          </div>
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
        </div>
        {/* 业绩指标区域 */}
        <div className={styles.perforContainer}>
          <div>
            <Title className={styles.work} title='业绩指标' />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险保费' width='65%' style={{height: 34}} data={this.state.todayTotalCiPremium} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险标的数' width='65%' style={{height: 34}} data={this.state.todayTotalCiCustCnt} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险件均' data={this.state.todayTotalCiAvgPremium} width='65%' style={{height: 34}} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计非车险保费' data={this.state.todayTotalNciPremium} width='65%' style={{height: 34}} />
          </div>
        </div>
      </div>
    )
  }
}
