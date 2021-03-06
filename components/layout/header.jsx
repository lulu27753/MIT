import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style'

function Header(props) {
  	const { span, children } = props;
    const classes = classNames({
      'idoll-layout-header': 'idoll-layout-header',
      [`idoll-layout-header-${span}`]: span
    });
  	return <div {...props} className={classes} >{children}</div>;
}

Header.propTypes = {
  span: PropTypes.number,
  children: PropTypes.node
};

export default Header;

