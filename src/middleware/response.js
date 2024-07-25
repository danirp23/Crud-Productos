const ERROR_RESPONSE_TEMPLATE = {
  statusCode: 500,
  headers: {
    "Content-Type": "application/json"
  },
  body: {}
};

const OK_RESPONSE_TEMPLATE = {
  statusCode: 200,
  headers: {
    "Content-Type": "application/json"
  }
};

const ERROR_ARRAY_RESPONSE_TEMPLATE = {
  statusCode: 422,
  headers: {
    "Content-Type": "application/json"
  }
};

/**
 * This function creates the status response of body's response
 * @param {*} details text to return
 * @param {*} statusCode status code to return in status.code
 */
function makeErrorResponse(details, statusCode) {
  let response = { ...ERROR_RESPONSE_TEMPLATE };
  response.body = JSON.stringify({ details });
  response.statusCode = statusCode;
  console.log('makeErrorResponse response:', response);
  console.log('makeErrorResponse details:', details);
  return response;
};

/**
 * This function creates the status response of body's response
 * @param {*} data request body to return
 */
function makeOkResponse(data) {
  console.log('makeOkResponse:', data);
  return { ...OK_RESPONSE_TEMPLATE, body: JSON.stringify({ data }) };
};

function makeErrorArrayResponse(message) {
  return { message };
};

module.exports = {
  makeErrorResponse,
  makeOkResponse,
  makeErrorArrayResponse
};
