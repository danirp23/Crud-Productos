const validatorHandler = require("../../middleware/validator");
const { arrayInsertSchema } = require("../../middleware/schemas/insertProductSchema");
const { makeErrorResponse } = require("../../middleware/response");
const { insertProductsController } = require("./controller");
const { errorBody, errorHandler } = require("../../utils/errorMessages");
/**
 * Handler for insert new products to db
 * @param {*} event
 */
const insertProductsHandler = async (event, context) => {
    try {
        console.log('insertProductsHandler', event);
        const data = event.body;
        const objectValid = await validatorHandler(arrayInsertSchema, data);
        const isValidEvent = typeof objectValid !== "object";
        if (!isValidEvent)
            return makeErrorResponse(`${errorBody} ${objectValid.message}`, 422);
        const response = await insertProductsController(data);
        return response;
    } catch (error) {
        return makeErrorResponse(`${errorHandler} ${error}`, 500);
    }

}

module.exports = { insertProductsHandler };