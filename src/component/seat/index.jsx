import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import classnames from 'classnames';
import { Tooltip, Icon } from 'components'
import burialPoint from 'api/burialPoint'

import styles from './index.less';
import female from 'assets/images/female.png'
import male from 'assets/images/male.png'

export default class Seat extends Component {
    constructor(props) {
      super(props)
      this.state = {
        status: props.status
      }
    }

    static propTypes = {
      status: PropTypes.object,
      handleModalStatus: PropTypes.func
    }

    componentWillReceiveProps (nextProps) {
      const { status } = nextProps
      this.setState({
        status: status
      })
    }

    handleClick = () => {
      const { handleModalStatus, status } = this.props
      // console.log('status', status)
      if (typeof handleModalStatus === 'function') {
        handleModalStatus(status.umId, true)
      }
      let jsonParams = {
        telephoneState: status.telephoneState,
        operateCode: 'click',
        operateObject: '点击坐席'
      }
      burialPoint.writeLogToDSInfo(jsonParams);
    }

    render() {
      const { status } = this.props;

      let className = classnames({
        [styles.box]: styles.box,
        [styles.outline]: status.telephoneState === '1'
      })

      return (
        <Tooltip placement='top' title={status.umId} >
          <div className={className} onClick={this.handleClick} >
            {status.sex === 'F' ? <img src={female} className={styles.person} /> : <img src={male} className={styles.person} />}
            {status.isNew === '1' && <div className={styles.new}>NEW</div>}
            {status.telephoneState === '2' && <Icon type='pro-phone-circle' className={styles.dialling} />}
            {status.telephoneState === '3' && <Icon type='pro-clock-circle' className={styles.unused} />}
          </div>
        </Tooltip>
        );
    }
}
