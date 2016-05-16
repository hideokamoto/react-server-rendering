import React, { Component } from 'react';
import Helmet from 'react-helmet';
import AppBar from 'material-ui/lib/app-bar';

export default class Header extends Component {
	render() {
		return (
			<header>
				<Helmet
                    title={this.props.items.name}
                    meta={[
                        {property: 'og:title', content: this.props.items.name},
                    ]} />
				<AppBar
				  title={this.props.items.name}
				/>
			</header>
		);
	}
}
