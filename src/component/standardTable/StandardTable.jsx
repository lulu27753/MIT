import React, { Component } from 'react';
import { message, Title } from 'components';
import Indicator from '../indicator/index';
import axios from 'axios';
import styles from './index.less';

export default class StandardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operate: '',
      brisk: '',
      dialNum: '',
      valid: '',
      accumulate: '',
      subscribe: '',
      realTime: '',
      callNum: '',
      carInsurance: '',
      carNum: '',
      carPiece: '',
      wrongCar: ''
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
        const dataSource = res.data.dataSource;
        this.setState({
          operate: dataSource.operate * 100 + '%',
          brisk: dataSource.brisk,
          dialNum: dataSource.dialNum,
          valid: dataSource.valid + 'h',
          accumulate: dataSource.accumulate + 'h',
          subscribe: dataSource.subscribe,
          realTime: dataSource.realTime,
          callNum: dataSource.callNum,
          carInsurance: dataSource.carInsurance + 'W',
          carNum: dataSource.carNum,
          carPiece: dataSource.carPiece,
          wrongCar: dataSource.wrongCar + 'W'
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
              <Indicator title='当前通话人力' data={this.state.operate} />
            </div>
            <div className={styles.embarkation}>
              <Indicator title='当前空闲人力' data={this.state.brisk} />
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
              <Indicator title='人均实时平均通时(上一时段)' data={this.statedialNum} className={styles.preTitle} />
            </div>
            <div className={styles.perAccumulate}>
              <Indicator title='人均实时有效通时(上一时段)' data={this.state.valid} className={styles.preTitle} />
            </div>
            <div className={styles.perAccumulate}>
              <Indicator title='人均当日累计通时' data={this.state.accumulate} className={styles.preTitle} />
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.perAccumulate}>
              <Indicator title='人均当日累计平均通时' data={this.state.subscribe} className={styles.preTitle} />
            </div>
            <div className={styles.perAccumulate}>
              <Indicator title='人均实时有效通次(上一时段)' data={this.state.realTime} className={styles.preTitle} />
            </div>
            <div className={styles.perAccumulate}>
              <Indicator title='人均当日累计通次' data={this.state.callNum} className={styles.preTitle} />
            </div>
          </div>
        </div>
        {/* 业绩指标区域 */}
        <div className={styles.perforContainer}>
          <div>
            <Title className={styles.work} title='业绩指标' />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险保费' data={this.state.carInsurance} className={styles.carInsurance} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险标的数' data={this.state.carNum} className={styles.carInsurance} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计车险件均' data={this.state.carPiece} className={styles.carInsurance} />
          </div>
          <div className={styles.perforList}>
            <Indicator title='当日累计非车险保费' data={this.state.wrongCar} className={styles.carInsurance} />
          </div>
        </div>
      </div>
    )
  }
}
