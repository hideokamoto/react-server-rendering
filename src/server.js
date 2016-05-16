import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import Layout from 'server/layout';
var fetch = require('isomorphic-fetch');
import Helmet from "react-helmet";

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';


function renderFullPage(renderedContent, initialProps, head ) {
	var prop = safeStringify( initialProps );
  return `
  <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>

    <head>
        <meta charset="utf-8">
        ${head.title}
		${head.meta}
		${head.link}
		${head.script}
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
		<style>
			body{ margin: 0;}
		</style>
    </head>
	<body>
    <div id="container">${renderedContent}</div>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

class Mui extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={this.props.muiTheme}>
				<Layout items={this.props.items}/>
			</MuiThemeProvider>
		)
	}
}


export default function render(req, res) {
	var ua = req.headers['user-agent'];
	const muiTheme = getMuiTheme({
	  palette: {
	    accent1Color: deepOrange500,
	  },
	  userAgent: ua,
	});
	fetch('http://wp-kyoto.net/wp-json/')
		.then( apiResult => apiResult.json() )
		.then( items => {
			const initialProps = {items};
			const renderedContent = renderToString(<Mui items={initialProps} muiTheme={muiTheme}/>);
			let head = Helmet.rewind();
			const renderedPage = renderFullPage( renderedContent, initialProps, head );
			res.statusCode = 200;
			res.send( renderedPage );
		}).catch( error => {
			const initialProps = {error};
			const renderedContent = renderToString(<Layout items={initialProps}/>);
			let head = Helmet.rewind();
			const renderedPage = renderFullPage( renderedContent, initialProps, head );
			res.statusCode = 500;
			renderPage( res, error );
		})

};
