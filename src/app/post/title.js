import React, { Component } from 'react';

export default class Title extends Component {
	getTitleText() {
		if ( this.props.post.title ) {
			return this.props.post.title.rendered;
		} else {
			return 'loading...';
		}
	}

	render() {
		var title = this.getTitleText();
		return (
			<h1>{title}</h1>
		);
	}
}
