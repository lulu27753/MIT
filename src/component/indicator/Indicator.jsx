import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

export default class Indicator extends Component {
  static defaultProps = {
    prefixCls: 'indicator',
    title: '指标',
    data: '200'
  }
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string
  }
  render () {
    const { title, data, className } = this.props;
    const classString = classNames(className, styles.monitoring)
    return (
      <div className={styles.indicator}>
        <span className={classString} >{ title }</span>
        <span className={styles.monitoring_data}>{ data }</span>
      </div>
    )
  }
}
