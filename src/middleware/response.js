const ERROR_RESPONSE_TEMPLATE = {
  statusCode: 500,
  body: {
    details: "Error",
  }
};

const OK_RESPONSE_TEMPLATE = {
  statusCode: 200
};
const ERROR_ARRAY_RESPONSE_TEMPLATE = {
  statusCode: 422
};

/**
 * This function creates the status response of body's response
 * @param {*} details text to return
 * @param {*} statusCode status code to return in status.code
 */
function makeErrorResponse(details, statusCode) {
  let response = { ...ERROR_RESPONSE_TEMPLATE };
  response.body = details;
  response.statusCode = statusCode;
  return response;
};

/**
 * This function creates the status response of body's response
 * @param {*} data request body to return
 */
function makeOkResponse(data) {
  return { ...OK_RESPONSE_TEMPLATE, body: data };
};

function makeErrorArrayResponse(data) {
  return { ...ERROR_ARRAY_RESPONSE_TEMPLATE, body: data };
};

module.exports = {
  makeErrorResponse,
  makeOkResponse,
  makeErrorArrayResponse
};