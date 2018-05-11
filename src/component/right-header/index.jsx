import React from 'react';
import services from 'api/services';
import urls from 'api/urls';

import styles from './index.less';

export default class RightHeader extends React.Component {
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
      this.getData(this.state.id)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id === this.state.id) {
      return false
    } else {
      this.setState({
        id: nextProps.id
      }, () => {
        this.getData(nextProps.id)
      })
    }
  }

  handleUpstate = (data) => {
    this.setState(data)
  }

  getData = (id) => {
    services.get(urls.queryTeamInfo, {umId: id}, this.handleUpstate)
  }

  render () {
    const { place, name, seatNum } = this.state
    return (
      <div className={styles.header} >
        <span>{place}</span>
        <span>{name || ''}</span>
        <span>{seatNum ? `团队坐席数量${seatNum}` : ''}</span>
      </div>
     )
  }
}

