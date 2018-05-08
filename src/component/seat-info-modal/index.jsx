import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { Modal, Title, Grid } from 'components';
import Indicator from 'component/indicator'
// import axios from 'axios';

// import styles from './index.less';
const Row = Grid.Row;
const Col = Grid.Col;

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

    // handleOk = () => {
    //     const { umId, handleModalStatus } = this.props
    //     if (typeof handleModalStatus === 'function') {
    //         handleModalStatus(umId, false)
    //     }
    // }

    handleCancel = () => {
        const { umId, handleModalStatus } = this.props
        if (typeof handleModalStatus === 'function') {
            handleModalStatus(umId, false)
        }
    }

    render() {
      const { visible } = this.props;

      return (
        <Modal visible={visible} title='坐席详情' footer={null} onCancel={this.handleCancel} width={800} >
          <Title title='基本信息' />
          <Row>
            <Col span={8}>
              <Indicator title='姓名' data='dada' />
            </Col>
          </Row>
          <Title title='当日工作情况' />
          <Title title='当日业绩情况' />
          <Title title='当日话务情况' />
        </Modal>
        );
    }
}
