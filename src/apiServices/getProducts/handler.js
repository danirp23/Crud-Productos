const { makeErrorResponse } = require("../../middleware/response");
const { getProductsController } = require("./controller");
const { errorHandler } = require("../../utils/errorMessages");
/**
 * Handler for get products to db
 * @param {*} event
 */
const getProductsHandler = async (event) => {
    try {
        const data = event;
        const response = await getProductsController(data);
        return response;
    } catch (error) {
        return makeErrorResponse(`${errorHandler} ${error}`, 500);
    }

}

module.exports = { getProductsHandler };