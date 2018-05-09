import React, { Component } from 'react';

import styles from './index.less';
import data from 'doc/interface/example/teamInfoQuery'

export default class rightHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      place: '',
      name: '',
      seatNum: ''
    }
  }

  componentWillMount () {
    if (this.state.id) {
      this.setState(data.data)
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps id', nextProps.id)
    console.log('state id', this.state.id)
    if (nextProps.id === this.state.id) {
      return false
    } else {
      this.setState({
        id: nextProps.id
      })
      this.setState(data.data)
    }
  }

  render () {
    const { place, name, seatNum } = this.state
    return (
      <div className={styles.header} >
        <span>{place}</span>
        <span>{ name || ''}</span>
        <span>{ seatNum ? '团队坐席数量' + seatNum : ''}</span>
      </div>
     )
  }
}

