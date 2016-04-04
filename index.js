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

app.intent('Hungry', 
	{
		"utterances": [ "{I am|I'm} hungry", "{Show me|Show} more" ]
	},

	function(req, res) {

	var reprompt = 'Tell me you are hungry';

	var nextStepPrompt = 'Would you like to hear todays specials?';

	yelpHelper.requestYelpStatus().then(function(data) {

		res.say(yelpHelper.formatRestaurantNameAndType(data)).send();

		res.say(nextStepPrompt).shouldEndSession(false);

	}).catch(function(err) {
		console.log(err.statusCode);
		console.log(err);

		var prompt = 'I am having trouble looking for food. Please try again later.';

		res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();

	});

	return false;
});


//Intent for seeing more information about a restaurant
app.intent('Open',

	{
		"slots" : {"RESTAURANT_NAME":"LITERAL", "RESTAURANT_TYPE":"LITERAL"},
		"utterances" : ["{open|show me|let's see|I want to see} {restaurant|RESTAURANT_NAME}", "{open|show me|let's see|I want to see} {type|RESTAURANT_TYPE} {food}"]
	},

	function(req, res) {
		var reprompt = '';

		var restaurantName = req.slot("RESTAURANT_NAME");
		var restaurantType = req.slot("RESTAURANT_TYPE");

		

		
		console.log(restaurantName);

});


// Connect the alexa-app to AWS Lambda 
exports.handler = app.lambda();
module.exports = app;