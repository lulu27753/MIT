import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

function Layout(props) {
    const { children } = props;
    // console.log('LayoutchildrenLength', children.length);
    const classes = classNames({
       'idoll-layout': 'doll-layout',
       'idoll-layout-has-sider': (children.length &&
       	children.filter((item) => {
       		// console.log(item);
         return Object.keys(item.type.propTypes).indexOf('collapsed') !== -1
       	})).length
    });
  	return <div {...props} className={classes}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
