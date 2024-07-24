const { insertProductsService } = require("./service");

const insertProductsController = async (dataInsert) => {
    const serviceResponse = await insertProductsService(dataInsert);
    return serviceResponse;
}
module.exports = { insertProductsController };