module.change_code = 1;

var _ = require('lodash');

var Alexa = require('alexa-app');

var app = new Alexa.app('yelper');

var YelpDataHelper = require('./yelp_data_helper');

var yelpHelper = new YelpDataHelper();

app.launch(function(req, res) {
	var prompt = 'For a Yelp recommended restaurant, say I am hungry';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('Hungry', function(req, res) {

	var reprompt = 'Tell me you are hungry';

	yelpHelper.requestYelpStatus().then(function(data) {

		res.say(yelpHelper.formatRestaurantNameAndType(data)).send();

	}).catch(function(err) {
		console.log(err.statusCode);
		console.log(err);

		var prompt = 'I am having trouble looking for food. Please try again later.';

		res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();

	});

	return false;
});

// app.intent('Show More', function(req, res) {
// 	var reprompt = 'You can ask me to show you more if you would like';

// 	yelpHelper.requestYelpStatus().then(function(data) {

// 		res.say(yelpHelper.formatRestaurantNameAndType(data)).send();

// 	}).catch(function(err) {
// 		console.log(err.statusCode);
// 		console.log(err);
// 		var prompt = 'I am having trouble looking for food. Please try again later.';

// 		res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();

// 	});
// 	return false;
// });
module.exports = app;