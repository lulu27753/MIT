import React from 'react';

export default class NotFound extends React.Component {
	render() {
    const pageStyle = {
      margin: '0 auto',
      textAlign: 'center',
      marginTop: '200px'
    }
		const titleStyle = {
      color: '#434e59',
      fontSize: '72px',
      fontWeight: '600',
      lineHeight: '72px',
      marginBottom: '24px',
    }
    const contentStyle = {
      color: `rgba(0, 0, 0, 0.45)`,
      fontSize: `20px`,
      lineHeight: `28px`,
      marginBottom: `16px`,
    }
		return (
  <div style={pageStyle}>
    <div style={titleStyle}>404</div>
    <div style={contentStyle}>抱歉，你访问的页面不存在</div>
  </div>
		);
	}
}
