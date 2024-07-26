const validatorHandler = require("../../middleware/validator");
const { makeErrorResponse } = require("../../middleware/response");
const { deleteProductsController } = require("./controller");
const { errorBody, errorHandler } = require("../../utils/errorMessages");
const { deleteSchema } = require("../../middleware/schemas/deleteProductSchema");
/**
 * Handler for delete products to db
 * @param {*} event
 */
const deleteProductsHandler = async (event) => {
    try {
        const data = event.body;
        const objectValid = await validatorHandler(deleteSchema, data);
        const isValidEvent = typeof objectValid !== "object";
        if (!isValidEvent)
            return makeErrorResponse(`${errorBody} ${objectValid.message}`, 422);
        const response = await deleteProductsController(data);
        return response;
    } catch (error) {
        return makeErrorResponse(`${errorHandler} ${error}`, 500);
    }

}

module.exports = { deleteProductsHandler };