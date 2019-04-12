import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker.js';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

//public and private keys for vapid
const publicVapidKey = 'BJZCQ4eUDBQxlvgsXvos7HRMp7j-SDqPgJ53IosUyEceihFFfmEEFcN4bWaWv8ybMOlRi4eM65SR0GYBNpoy4vk';
const privateVapidKey = 'UWpGaSexGRIMMTplnQT2R6uzdGKs06F-nGYyvO3aqNI';

//takes in a email address and the public and private keys
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Notification Route
app.post("/notification", (req, res) => {
	// Get pushSubscription object
	const notification = req.body;

	// Send 201 - resource created
	res.status(201).json({});

	// Create payload
	const payload = JSON.stringify({ title: "Push Test" });

	// Pass object into sendNotification
	webpush
		.sendNotification(notification, payload)
		.catch(err => console.error(err));
});


const port = 8002;

app.listen(port, () => console.log('Server started on port ${port}'));

ReactDOM.render((
		<BrowserRouter>
			<App />
		</BrowserRouter>
	), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
