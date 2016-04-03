"use strict";


var Client = require("./src/client");
var errorUtil = require("./src/utils/error");


module.exports = {
  createClient: Client.createClient,

  errorTypes: errorUtil.types
};
