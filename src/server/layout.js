import React, { Component } from 'react';
const Header = require('./header.js');
const Footer = require('./footer.js');

export default class Layout extends Component {
  getItemProps() {
	  console.log(this.props.items);
	if ( this.props.items.error ) {
		var error = {
			name: 'API Error',
			description: this.props.items.error.message
		};
		return error;
	} else {
		return this.props.items.items;
	}
  }
  render() {
    var items = this.getItemProps();
    return (
      <div id='container-row'>
        <Header items={items} />
		<hr/>
		<div id='app'></div>
		<hr/>
		<Footer/ >
      </div>
    );
  }
}
