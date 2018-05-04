import React, { Component } from 'react';
// import axios from 'axios';

import styles from './index.less';

export default class Overlook extends Component {
    constructor(props) {
      super(props)
      this.state = {
        umId: props.umId
      }
    }

    componentWillReceiveProps (oldProps, newProps) {
      // if (oldProps.id === newProps.id) {
      //   return false
      // } else {
        // axios.
        this.setState({
          umId: newProps.umId
        })
      // }
    }

    render() {
      return (
        <div className={styles.box} >
          {}
        </div>
        );
    }
}
