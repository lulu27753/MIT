import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { Modal } from 'components';
// import axios from 'axios';

// import styles from './index.less';

export default class SeatInfoModal extends Component {
    // constructor(props) {
    //   super(props)
    //   console.log('props', props)
    //   this.state = {
    //     umId: props.umId,
    //     visible: props.visible
    //   }
    //   console.log('state', this.state)
    // }

    // static propTypes = {
    //   umId: PropTypes.string,
    //   visible: PropTypes.bool
    // }

    handleOk = () => {
        const { umId, handleModalStatus } = this.props
        if (typeof handleModalStatus === 'function') {
            handleModalStatus(umId, false)
        }
    }

    handleCancel = () => {
        const { umId, handleModalStatus } = this.props
        if (typeof handleModalStatus === 'function') {
            handleModalStatus(umId, false)
        }
    }

    render() {
      const { visible, umId } = this.props;

      return (
        <Modal visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} >
          { visible + umId }
        </Modal>
        );
    }
}
