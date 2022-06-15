'use strict';

const express = require('express');
const axios = require('axios').default;


// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// App
const app = express();

// twitter bearer token
let token = 'TOP_SECRET';


app.get('/recenttweets/count/minute/clemson', (req, res) => {
	// do a get to example.com using axios

	function axiosTest() {
    	return axios.get(url).then(response => response.data)
	}

	// get the date 5 days ago
	let fiveDaysAgo = new Date();
 	fiveDaysAgo.setDate(fiveDaysAgo.getDate()-5);

	fiveDaysAgo = fiveDaysAgo.toISOString();
 	fiveDaysAgo = fiveDaysAgo.substring(0, 10);


 	let oldString = 'https://api.twitter.com/2/tweets/counts/recent?query=Clemson%20OR%20Clemson%20Tigers&start_time=2022-06-07T00:00:00.000Z&granularity=day';

	axios.get('https://api.twitter.com/2/tweets/counts/recent?query=Clemson%20OR%20Clemson%20Tigers&start_time='+fiveDaysAgo+'T00:00:00.000Z&granularity=day', {
		headers: {
   			Authorization: 'Bearer ' + token //the token is a variable which holds the token
 		}
	})
	.then(function (response) {
		console.log('the twitter response: ');
		console.log(response);

		//res.send('A JSON response that used a header');
		res.set('Access-Control-Allow-Origin', '*');
		res.send(response.data);
	})
	.catch(function (error) {
		console.log("error: ");
	    console.log(error);

	    res.send(error);
	})
	.then(function () {
		// always executed
	});
});

app.get('/recenttweets/count/yesterday/clemson', (req, res) => {
	// do a get to example.com using axios

	function axiosTest() {
    return axios.get(url).then(response => response.data)
	}

	// dynamically set the start time to yesterday at 00:00:00; and dynamically set the end time to 11:59:00
	// source: https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
	// source: https://bobbyhadz.com/blog/javascript-get-current-date-and-time-in-utc
	var startDate = new Date();
	startDate.setDate(startDate.getDate() - 1);
	// startDate.setTime('00:00:00');
	startDate = startDate.toISOString();
	console.log('startDate here: ');
	console.log(startDate);

	startDate = startDate.substring(0,10);

	console.log('startDate substringed: ');
	console.log(startDate);

	const startTimeStr = 'T00:00:00.000Z';
	const endTimeStr = 'T23:59:59.000Z';


	// let url = 'https://api.twitter.com/2/tweets/counts/recent?query=Clemson%20OR%20Clemson%20Tigers&start_time=2022-06-10T00:00:00.000Z&end_time=2022-06-10T23:59:00.000Z&granularity=day';
	let url = 'https://api.twitter.com/2/tweets/counts/recent?query=Clemson%20OR%20Clemson%20Tigers'
		+ '&start_time=' + startDate + startTimeStr 
		+ '&end_time=' + startDate + endTimeStr 
		+ '&granularity=day';

	console.log('twitter API call URL: ');
	console.log(url);

	axios.get(url, {
		headers: {
   			Authorization: 'Bearer ' + token
 		}
	})
	.then(function (response) {
		console.log('the twitter response: ');
		console.log(response);

		//res.send('A JSON response that used a header');
		res.set('Access-Control-Allow-Origin', '*');
		console.log('Sent allow origin header.');
		res.send(response.data);
	})
	.catch(function (error) {
		console.log("error: ");
	    console.log(error);

	    res.send(error);
	})
	.then(function () {
		// always executed
    	console.log("You should always see this message");
	});
});

app.listen(PORT, HOST);
console.log('Running on http://${HOST}:${PORT}');
