const validatorHandler = require("../../middleware/validator");
const { insertSchema } = require("../../middleware/schemas/insertProductSchema");
const { makeErrorResponse } = require("../../middleware/response");
const { updateProductsController } = require("./controller");
const { errorBody, errorHandler } = require("../../utils/errorMessages");
/**
 * Handler for update products to db
 * @param {*} event
 */
const updateProductsHandler = async (event) => {
    try {
        const data = event.body;
        const objectValid = await validatorHandler(insertSchema, data);
        const isValidEvent = typeof objectValid !== "object";
        if (!isValidEvent)
            return makeErrorResponse(`${errorBody} ${objectValid.message}`, 422);
        const response = await updateProductsController(data);
        return response;
    } catch (error) {
        return makeErrorResponse(`${errorHandler} ${error}`, 500);
    }

}

module.exports = { updateProductsHandler };