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
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    const { title, data, className, ...others } = this.props;
    delete others.prefixCls
    const width = others.style.width
    const height = others.style.height
    const classString = classNames(className, styles.monitoring)
    return (
      <div className={styles.indicator} style={{height: height}}>
        <span className={classString} style={{width:width}}>{ title }</span>
        <span className={styles.monitoring_data}>{ data }</span>
      </div>
    )
  }
}
