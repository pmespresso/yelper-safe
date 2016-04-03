"use strict";


var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var http = require("http");
var errorUtil = require("./utils/error");
var _ = require("lodash");


var ENDPOINT = "http://api.yelp.com/v2/";


function Client(options)
{
  this.oauth = options.oauth;
  this.timeout = options.timeout || 30000;
  this.agent = new http.Agent({
    maxSockets: (options.httpAgent || {}).maxSockets || 10
  });
}


Client.prototype.request = function (method, path, params)
{
  var options = {
    url: ENDPOINT + path,
    agent: this.agent,
    oauth: this.oauth,
    timeout: this.timeout,
    json: true,
    method: method
  };

  if (_.contains(["POST", "PUT", "DELETE"], method)) {
    options.form = params;
  } else {
    options.qs = params;
  }

  return request(options).spread(function (res, data) {
    if (res.statusCode !== 200) {
      throw errorUtil.makeFromResponse(res, data);
    }

    return data;
  }).catch(function (err) {
    throw errorUtil.cast(err);
  });
};


Client.prototype.search = function (params)
{
  return this.request("GET", "search", params);
};


Client.prototype.business = function (id, params)
{
  params = params || {};

  if (!_.isString(id)) {
    throw errorUtil.make(
      "Parameter 'id' must be a string", errorUtil.types.internal
    );
  }
  
  return this.request(
    "GET", "business/" + encodeURIComponent(id), params
  );
};



function createClient(options)
{
  return new Client(options);
}



module.exports.createClient = createClient;
