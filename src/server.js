import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from 'server/layout';

function renderFullPage(renderedContent) {
  return `
  <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>React Server Rendering sample</title>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    </head>
	<body>
    <div id="container">${renderedContent}</div>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

export default function render(req, res) {
  const renderedContent = renderToString(<Layout />);
  const renderedPage = renderFullPage(renderedContent);
  res.status(200).send(renderedPage);
};
