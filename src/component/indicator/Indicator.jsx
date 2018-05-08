import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
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
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    const { title, data, width, ...others } = this.props;
    delete others.prefixCls
    delete others.title
    delete others.data
    delete others.width

    // const classString = classNames(className, styles.monitoring)
    return (
      <div className={styles.indicator} {...others}>
        <span className={styles.monitoring} style={{width: width}}>{ title }</span>
        <span className={styles.monitoring_data}>{ data }</span>
      </div>
    )
  }
}
