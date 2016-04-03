"use strict";


var _ = require("lodash");



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
  unspecifiedLocation: "UNSPECIFIED_LOCATION",

  moduleInternal: "MODULE_INTERNAL_ERROR"
};



function isKnown(sourceId)
{
  return _(types)
    .values()
    .contains(sourceId);
}


function make(msg, type)
{
  if (!isKnown(type)) {
    return make("Invalid parameter 'type'", types.internal);
  }

  var err = new Error(msg);
  err.type = type;

  return err;
}


function makeFromResponse(res, data)
{
  var msg, sourceId, source;

  if (data && data.error) {
    source = data.error;
    msg = source.text;
    sourceId = source.id;
  } else {
    msg = "Unexpected error";
    sourceId = undefined;
    source = undefined;
  }

  var err = new Error(msg);

  err.statusCode = res.statusCode;
  err.type = isKnown(sourceId) ? sourceId : types.unknown;
  err.source = source;

  return err;
}


function cast(err)
{
  if (!err instanceof Error) {
    throw make(
      "Cannot cast from a non-error object type", types.moduleInternal
    );
  }

  if (err.type) {
    // Already an identified error
    return err;
  } else {
    // Attach an unknown type to the error
    return make(err.message, types.unknown);
  }
}


module.exports = {
  makeFromResponse: makeFromResponse,
  make: make,
  cast: cast,

  types: types
};
