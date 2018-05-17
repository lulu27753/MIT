import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.less';

export default class Indicator extends Component {
  static defaultProps = {
    prefixCls: 'indicator',
    title: '',
    data: ''
  }
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string
  }
  render () {
    const { title, data, width, ...others } = this.props;
    delete others.prefixCls
    delete others.title
    delete others.data
    delete others.width

    return (
      <div className={styles.indicator} {...others}>
        <span className={styles.monitoring} style={{width: width}}><span className={styles.title_span}>{ title }</span></span>
        <span className={styles.monitoring_data}><span className={styles.data_span}>{ data }</span></span>
      </div>
    )
  }
}
