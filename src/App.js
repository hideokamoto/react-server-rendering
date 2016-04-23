import React, { Component } from 'react';
const Post = require('./app/post/post.js');

export default class App extends Component {
	render() {
		return (
			<div>
				<Post />
			</div>
		);
	}
}
