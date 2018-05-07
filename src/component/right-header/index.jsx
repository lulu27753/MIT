import React, { Component } from 'react';

import styles from './index.less';

export default class rightHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      place: '',
      name: '',
      teamNumber: ''
    }
  }

  componentWillMount () {
    this.setState({
      place: '上海销售中心',
      name: '张三',
      teamNumber: 120
    })
  }

  componentWillReceiveProps () {
    this.setState({
      place: '上海销售中心',
      name: '张三',
      teamNumber: 120
    })
  }

  render () {
    const { place, name, teamNumber } = this.state
    return (
      <div className={styles.header} >
        <span>{place}</span>
        <span>团队长 : {name}</span>
        <span>团队坐席数量 : {teamNumber}</span>
      </div>
     )
  }
}

