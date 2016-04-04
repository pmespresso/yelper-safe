var _ = require('lodash');
var config = require('./api_key');

var ENDPOINT = 'https://api.yelp.com/v2/search/?location=San Francisco, CA';
/**
 * The YELP REST Node Module
 */
var OAuth = require('oauth-request-promise');
var yelp = OAuth({
    consumer: {
		public: config.CONSUMER_PUBLIC_KEY,
		secret: config.CONSUMER_SECRET
	}
});

yelp.setToken({
    public: config.PUBLIC_KEY,
    secret: config.SECRET
});

// I just need name, category, rating, phone number, mobileURL, address
var initialYelpData = {
	'names': [],
	'categories': [],
	'ratings': [],
	'phoneNumber': [],
	'mobileURL': [],
	'address': []
}

function YelpDataHelper() { }

YelpDataHelper.prototype.requestYelpStatus = function () {
	return this.getYelpRestaurants().then(
		function(response) {
			console.log('success - received info from Yelp');

			for (var i=0; i <= response.body.businesses.length - 1; i++) {
				initialYelpData['names'].push(response.body.businesses[i].name);
				initialYelpData['categories'].push(response.body.businesses[i].categories[0][0]);
				initialYelpData['ratings'].push(response.body.businesses[i].rating);
				initialYelpData['phoneNumber'].push(response.body.businesses[i].phone);
				initialYelpData['mobileURL'].push(response.body.businesses[i].mobile_url);
				initialYelpData['address'].push(response.body.businesses[i].location);
			}

			console.log("Here is: " + initialYelpData.names);
			console.log("Here is: " + initialYelpData.categories);
			console.log("Here is: " + initialYelpData.ratings);
			console.log("Here is: " + initialYelpData.phoneNumber);
			console.log("Here is: " + initialYelpData.mobileURL);
			console.log("Here is: " + initialYelpData.address[0]);
			
			return response.body;
			}
		);
};

YelpDataHelper.prototype.getYelpRestaurants = function () {

	return yelp.get({
	   url: ENDPOINT,
	   resolveWithFullResponse: true,
	   json: true
	});
	
};

var j = 0;

YelpDataHelper.prototype.formatRestaurantNameAndType = function(data) {
	var restaurants = _.template('You should check out ${restaurantName}. They have ${restaurantType}. To hear about another restaurant, say, Show More.') ({
		// They have ${restaurantType[0]} food. There is also ${restaurantName[1]} with ${restaurantType[1]} food or ${restaurantName[2]} with ${restaurantType[2]} food.')({
    restaurantName: initialYelpData['names'][j],
    restaurantType: initialYelpData.categories[j]
  });

	j += 1;
	return restaurants;
};


module.exports = YelpDataHelper;