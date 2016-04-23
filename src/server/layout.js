import React, { Component } from 'react';
const Header = require('./header.js');
const Footer = require('./footer.js');

export default class Layout extends Component {
  render() {
    return (
      <div id='container-row'>
        <Header />
		<hr/>
		<div id='app'></div>
		<hr/>
		<Footer/ >
      </div>
    );
  }
}
