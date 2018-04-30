import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import omit from 'object.omit'

import Icon from '../icon/index'

import './style'

class Sider extends Component {
  constructor(props) {
    super(props)
    const { collapsed } = props;
    this.state = {
      collapsed: collapsed
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  static defaultProps = {
    collapsed: false,
  }
  toggleMenu(spanNum) {
    this.setState({
      collapsed: !this.state.collapsed
    }, () => {
      const { onCollapse } = this.props;
      if (onCollapse) {
        onCollapse(this.state.collapsed)
      }
    });
  }

  render() {
    const { span, toggle, children, foldSpan, toggleStyle } = this.props
    let collapsed = this.state.collapsed
    let currentSpan = span

    if (toggle && foldSpan && collapsed) {
      currentSpan = foldSpan.fold
    } else if (toggle && foldSpan && !collapsed) {
      currentSpan = foldSpan.unfold
    }

    const classes = classNames({
      'idoll-layout-sider': 'doll-layout-sider',
      [`idoll-layout-sider-${currentSpan}`]: currentSpan
    })
    const iconType = collapsed ? 'menu-unfold' : 'menu-fold'

    const otherProps = omit(this.props, [
      'toggle',
      'toggleStyle',
      'foldSpan',
      'collapsed',
      'onCollapse'
    ]);

  	return (
    <div {...otherProps} className={classes}>
      { toggle ? <Icon type={iconType} key={0} onClick={this.toggleMenu} className='idoll-silder-toggle' style={toggleStyle} /> : ''}
      { children }
    </div>
  	)
  }
}

Sider.propTypes = {
  span: PropTypes.string,
  toggle: PropTypes.bool,
  toggleStyle: PropTypes.object,
  foldSpan: PropTypes.object,
  children: PropTypes.node,
  onCollapse: PropTypes.func,
}

export default Sider
