const Joi = require("joi");

const deleteSchema = Joi.object({
        idProduct: Joi.string().required()
});
module.exports = {
    deleteSchema
};