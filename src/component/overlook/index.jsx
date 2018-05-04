import React, { Component } from 'react';
import Seat from 'component/seat';
import SeatInfoModal from 'component/seat-info-modal'
// import axios from 'axios';
import data from './data.jsx'

import styles from './index.less';

const minCNumber = 13;
const minRNumber = 8;

export default class Overlook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        cNumber: minCNumber,
        rNumber: minRNumber,
        dataSource: '',
        visible: false,
        umId: ''
      }
    }

    componentWillMount () {
      this.setState({
        cNumber: data.cNumber,
        rNumber: data.rNumber,
        dataSource: data.dataSource
      })
    }

    componentWillReceiveProps (oldProps, newProps) {
      this.setState({
        cNumber: data.cNumber,
        rNumber: data.rNumber,
        dataSource: data.dataSource
      })
    }

    // 点击坐席图标
    handleModalStatus = (umId, visible) => {
      this.setState({
        visible: visible,
        umId: umId
      })
    }

    // 渲染坐席工位图
    renderSpace () {
      const { dataSource } = this.state
      const boxs = this.renderPlain();
      dataSource.length && dataSource.map((item) => {
        if (boxs[item.x]) boxs[item.x].props.children[item.y] = (<Seat key={item.x + '_' + item.y} status={item} handleModalStatus={this.handleModalStatus} />)
      })

      return boxs;
    }

    // 渲染工位图背景区域
    renderPlain() {
      const { cNumber, rNumber } = this.state
      const boxs = [];
      let cNum = cNumber > minCNumber ? cNumber : minCNumber
      let rNum = rNumber > minRNumber ? rNumber : minRNumber

      for (let i = 0; i <= cNum; i++) {
        let rowBox = []
        for (let j = 0; j <= rNum; j++) {
          rowBox.push(<div key={i + '_' + j} className={styles.plain_box} />)
          if (i === cNum && j === rNum) {
            return boxs;
          }
        }
        boxs.push(<div key={i}>{ rowBox }</div>)
      }
    }

    render() {
      const { visible, umId } = this.state
      return (
        <div className={styles.container} >
          {this.renderSpace()}
          <SeatInfoModal visible={visible} umId={umId} handleModalStatus={this.handleModalStatus} />
        </div>
        );
    }
}
