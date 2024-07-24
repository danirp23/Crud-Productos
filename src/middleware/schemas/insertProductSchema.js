const Joi = require("joi");

const insertSchema = Joi.object({
        idProduct: Joi.string().required(),
        rut: Joi.string().required(),
        name: Joi.string().required()
});
const arrayInsertSchema = Joi.array().items(insertSchema);
module.exports = {
    insertSchema,
    arrayInsertSchema
};