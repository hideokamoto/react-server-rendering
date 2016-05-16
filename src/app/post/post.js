import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/lib/card';
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
		wp.posts().embed().get(function( err, data ) {
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

	_get_term_text( terms ) {
		var text = '';
		terms.map( ( term ) => {
			text += term.name + ' '
		})
		return text;
	}

	render() {
		var postList = this.state.post.map( ( post ) => {
			var term_text = this._get_term_text( post['_embedded']['https://api.w.org/term'][1] );
			var author = post['_embedded']['author'][0];
			var date = new Date( post.date ).toLocaleString();
			return (
				<Card key={post.id}>
					<CardHeader
						title={author.name}
						subtitle={date}
						avatar={author.avatar_urls[24]}
						/>
					<CardTitle title={post.title.rendered} subtitle={term_text}/>
					<CardText><div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} /></CardText>
				</Card>
			);
		});
		return (
			<div>{postList}</div>
		);
	}
}
