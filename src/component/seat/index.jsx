import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import classnames from 'classnames';
// import axios from 'axios';
import { Tooltip, Icon } from 'components'

import styles from './index.less';
import female from 'assets/images/female.svg'
import male from 'assets/images/male.svg'

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

      let className = classnames({
        [styles.box]: styles.box,
        [styles.outline]: status.telephoneState === 1
      })

      return (
        <Tooltip placement='top' title={status.umId} >
          <div className={className} onClick={this.handleClick} >
            {status.sex === 'F' ? <img src={female} className={styles.person} /> : <img src={male} className={styles.person} />}
            {status.isNew === 1 && <div className={styles.new}>NEW</div>}
            {status.telephoneState === 3 && <Icon type='phone' className={styles.dailling} />}
            {status.telephoneState === 4 && <Icon type='clock-o' className={styles.unused} />}
          </div>
        </Tooltip>
        );
    }
}
