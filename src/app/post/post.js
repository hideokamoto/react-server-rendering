import React, { Component } from 'react';
const Title = require('./title.js');
const Content = require('./content.js');
var WP = require( 'wordpress-rest-api' );
var wp = new WP({ endpoint: 'http://wp-kyoto.net/wp-json' });

export default class Post extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			post: []
		}
	}

	getPost() {
		var self = this;
		wp.posts().get(function( err, data ) {
			if ( err ) {
				// handle err
				console.error( err );
			}

			self.setState({
				post:data
			});
		});
	}

	componentDidMount() {
		this.getPost();
	}

	render() {
		var postList = this.state.post.map( ( post ) => {
			return (
				<article>
					<Title post={post}/>
					<Content post={post}/>
				</article>
			);
		});
		return (
			<div>{postList}</div>
		);
	}
}
