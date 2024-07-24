const ERROR_RESPONSE_TEMPLATE = {
  status: {
    code: 500,
    details: "Error",
  }
};

const OK_RESPONSE_TEMPLATE = {
  statuscode: 200
};
const ERROR_ARRAY_RESPONSE_TEMPLATE = {
  statuscode: 422
};

/**
 * This function creates the status response of body's response
 * @param {*} details text to return
 * @param {*} statusCode status code to return in status.code
 */
function makeErrorResponse(details, statusCode) {
  let response = { ...ERROR_RESPONSE_TEMPLATE };
  response.status.details = details;
  response.status.code = statusCode;
  return response;
};

/**
 * This function creates the status response of body's response
 * @param {*} data request body to return
 */
function makeOkResponse (data) { 
  return { ...OK_RESPONSE_TEMPLATE, data };
};

function makeErrorArrayResponse (data) { 
  return { ...ERROR_ARRAY_RESPONSE_TEMPLATE, data };
};

module.exports = {
  makeErrorResponse,
  makeOkResponse,
  makeErrorArrayResponse
};
