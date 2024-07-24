const { deleteProductsService } = require("./service");

const deleteProductsController = async (dataDelete) => {
    const serviceResponse = await deleteProductsService(dataDelete);
    return serviceResponse;
}
module.exports = { deleteProductsController };