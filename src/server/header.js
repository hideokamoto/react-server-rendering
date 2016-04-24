import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<header>
				<h2>{this.props.items.name}</h2>
				<p>{this.props.items.description}</p>
			</header>
		);
	}
}
