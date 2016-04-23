import React, { Component } from 'react';

export default class Layout extends Component {
  render() {
    return (
      <div id='container-row'>
        <header>
			Header
		</header>
		<div id='app'></div>
		<aside>
			sidebar
		</aside>
		<footer>
			Footer
		</footer>
      </div>
    );
  }
}
