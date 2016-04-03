Yelp  
=================


Simple, promise-based, node module for interfacing with Yelp API v2.0. 


### How to use


```javascript
var yelp = require("node-yelp");


var client = yelp.createClient({
  oauth: {
    "consumer_key": "xxxxxxxxxxxxxxxxxxxxxxxx",
    "consumer_secret": "xxxxxxxxxxxxxxxxxxxxxxxx",
    "token": "xxxxxxxxxxxxxxxxxxxxxxxx",
    "token_secret": "xxxxxxxxxxxxxxxxxxxxxxxx"
  },
  
  // Optional settings:
  httpClient: {
    maxSockets: 25  // ~> Default is 10
  }
});


client.search({
  terms: "Café de la presse",
  location: "BELGIUM"
}).then(function (data) {
  var businesses = data.businesses;
  var location = data.region;
  
  // ... 
});


client.business("grand-place-bruxelles-2", {
  cc: "US"
}).then(function (data) {
  // ...
});
```


### Error handling


Every error that comes from the module has an `id` property attached to it:

```javascript

var yelp = require("node-yelp");


client.search({
  terms: "Café de la presse",
  location: "BELGIUM"
}).then(function (data) {
  // ..
}).catch(function (err) {
  if (err.type === yelp.errorTypes.areaTooLarge) {
    // ..
  } else if (err.type === yelp.errorTypes.unavailableForLocation) {
    // ..
  }
});
```


Types: 

```javascript

var types = {
  unknown: "UNKNOWN",
  internal: "INTERNAL_ERROR",
  exceededRequests: "EXCEEDED_REQS",
  missingParameter: "MISSING_PARAMETER",
  invalidParameter: "INVALID_PARAMETER",
  invalidSignature: "INVALID_SIGNATURE",
  invalidCredentials: "INVALID_CREDENTIALS",
  invalidOAuthCredentials: "INVALID_OAUTH_CREDENTIALS",
  invalidOAuthUser: "INVALID_OAUTH_USER",
  accountUnconfirmed: "ACCOUNT_UNCONFIRMED",
  passwordTooLong: "PASSWORD_TOO_LONG",
  unavailableForLocation: "UNAVAILABLE_FOR_LOCATION",
  areaTooLarge: "AREA_TOO_LARGE",
  multipleLocations: "MULTIPLE_LOCATIONS",
  businessUnavailable: "BUSINESS_UNAVAILABLE",
  unspecifiedLocation: "UNSPECIFIED_LOCATION"
};

```


### Dependencies

* bluebird: `~2.2.2`
* request: `~2.40.0`


### LICENSE 

MIT
