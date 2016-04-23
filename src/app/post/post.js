import React, { Component } from 'react';
const Title = require('./title.js');
const Content = require('./content.js');
var WP = require( 'wordpress-rest-api' );
var wp = new WP({ endpoint: 'http://rest-api.dev/wp-json' });

export default class Post extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			post: []
		}
	}

	getPost() {
		var self = this;
		wp.posts().id( 1 ).get(function( err, data ) {
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
		return (
			<article>
				<Title post={this.state.post}/>
				<Content post={this.state.post}/>
			</article>
		);
	}
}
