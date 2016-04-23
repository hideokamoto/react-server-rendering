import React, { Component } from 'react';

export default class Content extends Component {
	getContent() {
		if ( this.props.post.content ) {
			return this.props.post.content.rendered;
		} else {
			return 'loading...';
		}
	}

	render() {
		var content = this.getContent();
		return (
			<div dangerouslySetInnerHTML={{__html: content}} />
		);
	}
}
