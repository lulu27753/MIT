import React, { Component } from 'react';
// import axios from 'axios';
import data from './data.jsx'

import styles from './index.less';

export default class Overlook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        cNumber: 13,
        rNumber: 8,
        dataSource: ''
      }
      // this.renderBackground();
    }

    componentWillMount () {
      this.setState({
        cNumber: data.cNumber,
        rNumber: data.rNumber,
        dataSource: data.dataSource
      })
    }

    componentWillReceiveProps (oldProps, newProps) {
      // if (oldProps.id === newProps.id) {
      //   return false
      // } else {
        // axios.
        this.setState({
          cNumber: data.cNumber,
          rNumber: data.rNumber,
          dataSource: data.dataSource
        })
      // }
    }

    renderSpace () {
      const { dataSource } = this.state
      const boxs = this.renderPlain();
      dataSource.length && dataSource.map((item) => {
        if (boxs[item.x]) boxs[item.x].props.children[item.y] = (<div key={item.x + '_' + item.y} className={styles.personal} />)
      })
console.log('boxs', boxs);
      return boxs;
    }

    renderPlain() {
      const { cNumber, rNumber } = this.state
      const boxs = [];

      for (let i = 0; i <= cNumber; i++) {
        let rowBox = []
        for (let j = 0; j <= rNumber; j++) {
          rowBox.push(<div key={i + '_' + j} className={styles.plain_box} />)
          if (i === cNumber && j === rNumber) {
            return boxs;
          }
        }
        boxs.push(<div key={i}>{ rowBox }</div>)
      }
    }

    // renderBackground () {
    //   const cBackgroundNum = 20
    //   const rBackgroundNum = 10
    //   const backgroundBox = [];

    //   for (let i = 0; i <= cBackgroundNum; i++) {
    //     let rowBox = []
    //     for (let j = 0; j <= rBackgroundNum; j++) {
    //       rowBox.push(<div key={i + '_' + j} className={styles.plain_box} />)
    //       if (i === cBackgroundNum && j === rBackgroundNum) {
    //         return backgroundBox;
    //       }
    //     }
    //     backgroundBox.push(<div key={i}>{ rowBox }</div>)
    //   }
    // }

    render() {
      return (
        <div className={styles.container} >
          {this.renderSpace()}
        </div>
        );
    }
}
