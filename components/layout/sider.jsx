import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import omit from 'object.omit'

import './style'

class Sider extends Component {
  constructor(props) {
    super(props)
    let collapsed
    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = false;
    }
    this.state = {
      collapsed
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('collapsed' in nextProps) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
    }
  }

  setCollapsed = (collapsed) => {
    if (!('collapsed' in this.props)) {
      this.setState({
        collapsed,
      });
    }
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }

  toggle = () => {
    const collapsed = !this.state.collapsed;
    this.setCollapsed(collapsed);
  }

  render() {
    const { span, children, collapsed } = this.props

    let currentSpan
    if (typeof span === 'number') {
      currentSpan = span
    } else if (typeof span === 'object') {
      currentSpan = collapsed ? span.fold : span.unfold
    }

    const classes = classNames({
      'idoll-layout-sider': 'doll-layout-sider',
      [`idoll-layout-sider-${currentSpan}`]: currentSpan
    })

    const otherProps = omit(this.props, [
      'span',
      'collapsed',
      'onCollapse'
    ]);

  	return (
    <div {...otherProps} className={classes}>
      {children}
    </div>
  	)
  }
}

Sider.propTypes = {
  span: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  onCollapse: PropTypes.func,
}

export default Sider
