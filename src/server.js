import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from 'server/layout';
var fetch = require('isomorphic-fetch');
import Helmet from "react-helmet";

function renderFullPage(renderedContent, initialProps, head ) {
	var title = initialProps.items.name;
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
		${head.style}
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    </head>
	<body>
    <div id="container">${renderedContent}</div>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
	<script>
	var test = ${prop};
	console.log(test);
	</script>
    </body>
    </html>

  `;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export default function render(req, res) {
	fetch('http://rest-api.dev/wp-json/')
		.then( apiResult => apiResult.json() )
		.then( items => {
			const initialProps = {items};
			const renderedContent = renderToString(<Layout items={initialProps}/>);
			let head = Helmet.rewind();
			const renderedPage = renderFullPage( renderedContent, initialProps, head );
			res.status( 200 ).send( renderedPage );
		}).catch( error => {
			res.status( 500 ).send( error.message );
		})
};
