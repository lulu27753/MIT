import React, { Component } from 'react';
import Seat from 'component/seat';
import SeatInfoModal from 'component/seat-info-modal'
import StandardTable from 'component/standard-table'
import { Icon } from 'components'
import services from 'api/services';
import urls from 'api/urls';

import styles from './index.less';

const minCNumber = 20;
const minRNumber = 8;

export default class Overlook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        id: props.id,
        cNumber: minCNumber,
        rNumber: minRNumber,
        dataSource: '',
        visible: false,
        umId: ''
      }
    }

    componentWillReceiveProps (nextProps) {
      if (this.state.id && (nextProps.id === this.state.id)) {
        return false
      } else {
        this.setState({id: nextProps.id}, () => {
          this.getData(this.state.id)
        })
      }
    }

    handleUpdateState = (data) => {
      this.setState(data)
    }

    handleError = (data) => {
      // console.log('handleError', data)
    }

    getData (id) {
      if (this.state.id || this.state.visible) {
          services.post(urls.queryTeamSeatStatus, {umId: id}, this.handleUpdateState, this.handleError)
      }
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
        if (boxs[item.y]) boxs[item.y].props.children[item.x] = (<Seat key={item.x + '_' + item.y} status={item} handleModalStatus={this.handleModalStatus} />)
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

    // 下载团队指标
    downloadTeamIndex = () => {
      console.log('download')
      window.location.href = urls.downloadTeamIndx
    }

    // 刷新
    refresh = () => {
      this.getData(this.state.id)
    }

    render() {
      const { id, visible, umId } = this.state
      console.log('id', id);
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          <div className={styles.toolsHeader}>
            <div className={styles.toolsHeader_left} >
              <i className={styles.outline} />下线
              <Icon type='pro-phone-circle' className={styles.dialling} />通话
              <Icon type='pro-clock-circle' className={styles.unused} />空闲
            </div>
            <div className={styles.toolsHeader_right} >
              {id && <Icon type='pro-download' className={styles.download} onClick={this.downloadTeamIndex} />}
              {id && <Icon type='pro-sync' className={styles.sync} onClick={this.refresh} />}
            </div>
          </div>
          <div className={styles.container} >
            {this.renderSpace()}
            <SeatInfoModal visible={visible} umId={umId} handleModalStatus={this.handleModalStatus} />
          </div>
          <StandardTable id={id} />
        </div>
        );
    }
}
