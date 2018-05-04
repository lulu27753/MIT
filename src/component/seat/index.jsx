import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
// import axios from 'axios';
import { Tooltip } from 'components'

import styles from './index.less';

export default class Seat extends Component {
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     umId: props.umId
    //   }
    // }

    static propTypes = {
      status: PropTypes.object,
      handleModalStatus: PropTypes.func
    }

    handleClick = () => {
      const { handleModalStatus, status } = this.props
      console.log('status', status)
      if (typeof handleModalStatus === 'function') {
        handleModalStatus(status.umId, true)
      }
    }

    render() {
      const { status } = this.props;

      return (
        <Tooltip placement='top' title={status.umId} >
          <div className={styles.box} onClick={this.handleClick} >
            {status.sex + '-' + status.isNew + '-' + status.telephoneState + '-' + status.name}
          </div>
        </Tooltip>
        );
    }
}
