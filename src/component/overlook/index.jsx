import React, { Component } from 'react';
// import axios from 'axios';

import styles from './index.less';

export default class Overlook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        cNumber: 5,
        rNumber: 8,
        dataSource: []
      }
    }

    componentWillReceiveProps (oldProps, newProps) {
      if (oldProps.id === newProps.id) {
        return false
      } else {
        // axios.
      }
    }

    renderSpace () {
      // const dataSource = this.state.dataSource
      const { cNumber, rNumber } = this.state

      const boxs = [];
      console.log('renderSpace')
      for (let i; i <= cNumber; i++) {
        for (let j; j <= rNumber; j++) {
          if (i === 1 && j === 1) {
            boxs.push(<span className={styles.plain_first_box} />)
          } else if (i === 1) {
            boxs.push(<span className={styles.plain_top_box} />)
          } else if (j === 1) {
            boxs.push(<span className={styles.plain_left_box} />)
          } else {
            boxs.push(<span className={styles.plain_box} />)
          }
          if (i === cNumber && j === rNumber) {
            console.log(boxs)
            return boxs;
          }
        }
      }
    }

    renderPlain() {
      const cNumber = 5;
      const rNumber = 8;
      const boxs = [];
      console.log('renderPlain')
      for (let i; i <= cNumber; i++) {
        for (let j; j <= rNumber; j++) {
          if (i === 1 && j === 1) {
            boxs.push(<span className={styles.plain_first_box} />)
          } else if (i === 1) {
            boxs.push(<span className={styles.plain_top_box} />)
          } else if (j === 1) {
            boxs.push(<span className={styles.plain_left_box} />)
          } else {
            boxs.push(<span className={styles.plain_box} />)
          }
          if (i === cNumber && j === rNumber) {
            console.log(boxs)
            return boxs;
          }
        }
      }
    }

    render() {
      return (
        <div className={styles.container} >
          {this.renderSpace()}
        </div>
        );
    }
}
