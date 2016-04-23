import React, { Component } from 'react';
const Title = require('./title.js');
const Content = require('./content.js');

export default class Post extends Component {
	render() {
		return (
			<article>
				<Title />
				<Content />
			</article>
		);
	}
}
