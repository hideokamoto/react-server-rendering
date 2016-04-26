import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Header extends Component {
	render() {
		return (
			<header>
				<Helmet
                    title={this.props.items.name}
                    meta={[
                        {property: 'og:title', content: this.props.items.name},
                    ]} />
				<h2>{this.props.items.name}</h2>
				<p>{this.props.items.description}</p>
			</header>
		);
	}
}
