const { updateProductsService } = require("./service");

const updateProductsController = async (dataUpdate) => {
    const serviceResponse = await updateProductsService(dataUpdate);
    return serviceResponse;
}
module.exports = { updateProductsController };