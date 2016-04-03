var OAuthRequest = require('./');

var twitter = OAuthRequest({
    consumer: {
        public: process.env.TWITTER_CONSUMER_PUBLIC,
        secret: process.env.TWITTER_CONSUMER_SECRET
    }
});

twitter.setToken({
    public: process.env.TWITTER_TOKEN_PUBLIC,
    secret: process.env.TWITTER_TOKEN_SECRET
});

//list user timeline
twitter.get({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    json: true
}).then(function(err, res, tweets) {
    console.log(tweets);
});

//list user timeline limit 5
twitter.get({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    qs: {
        count: 5
    },
    json: true
}).then(function(err, res, tweets) {
    console.log(tweets);
});
