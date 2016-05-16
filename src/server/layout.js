import React, { Component } from 'react';
const Header = require('./header.js');
const Footer = require('./footer.js');
import Helmet from "react-helmet";

export default class Layout extends Component {
  getItemProps() {
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
		<Helmet
			meta={[
				{"name": "description", "content": items.description }
			]}
		/>
        <Header items={items} />
		<div id='app'></div>
		<hr/>
		<Footer/ >
      </div>
    );
  }
}
