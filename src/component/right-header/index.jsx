import React, { Component } from 'react';

import styles from './index.less';

export default class rightHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      teamNumber: ''
    }
  }

  componentWillMount () {
    this.setState({
      name: '张三',
      teamNumber: 120
    })
  }

  componentWillReceiveProps () {
    this.setState({
      name: '张三',
      teamNumber: 120
    })
  }

  render () {
    const { name, teamNumber } = this.state
    return (
      <div className={styles.header} >
        <span>团队长 : {name}</span>
        <span>团队坐席数量 : {teamNumber}</span>
      </div>
     )
  }
}

