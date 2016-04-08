module.change_code = 1;

var _ = require('lodash');

var Alexa = require('alexa-app');

var app = new Alexa.app('yelper');

var YelpDataHelper = require('./yelp_data_helper');

var yelpHelper = new YelpDataHelper();

var initialYelpData = yelpHelper.initialYelpData;

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
		var prompt = 'Say show me and then the restaurants name or the type of restaurant. ';
		var reprompt = 'Say show me and then the restaurants name or the type of restaurant. For example, you could say, show me chinese food.';

		var restaurantName = req.slot("RESTAURANT_NAME");
		var restaurantType = req.slot("RESTAURANT_TYPE");

		console.log("name slot: " + restaurantName);
		console.log("type slot: " + restaurantType);
		console.log("initial yelp data: " + initialYelpData.names);


		/* TODO 

		 * If Hungry request wasn't called first 
		 * You need to call so that the data gets memoized.

		*/

		// find out which index of initialYelpData['names'] corresponds to restaurantName
		// or initialYelpData['categories'] corresponds to restaurantType.


		/* TODO 
		* At some point this will have to check for any slot that may have been filled
		*/
		if (restaurantName === undefined) {
			var indexOfCategory = _.indexOf(initialYelpData['categories'], restaurantType);
		} else if (restaurantType === undefined) {
			var indexOfName = _.indexOf(initialYelpData['names'], restaurantName);
		} else {
			var indexOfName = _.indexOf(initialYelpData['names'], restaurantName);
		}

		console.log(indexOfName);
		console.log(indexOfCategory);
});


// Connect the alexa-app to AWS Lambda 
exports.handler = app.lambda();
module.exports = app;