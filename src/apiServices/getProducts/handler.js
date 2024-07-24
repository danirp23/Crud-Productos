const { makeErrorResponse } = require("../../middleware/response");
const { getProductsController } = require("./controller");
const { errorHandler } = require("../../utils/errorMessages");
/**
 * Handler for get products to db
 * @param {*} event
 */
const getProductsHandler = async (event, context) => {
    try {
        console.log('getProductsHandler', event);
        const data = event;
        console.log('event:',event);
        const response = await getProductsController(data);
        return response;
    } catch (error) {
        return makeErrorResponse(`${errorHandler} ${error}`, 500);
    }

}

module.exports = { getProductsHandler };