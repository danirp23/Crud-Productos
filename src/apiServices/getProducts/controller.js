const { makeOkResponse } = require("../../middleware/response");
const { getOneProductsService, getAllProductsService } = require("./service");

const getProductsController = async (dataGet) => {
    try {
        let serviceResponse
        if (dataGet.queryStringParameters?.idProduct) {
            serviceResponse = await getOneProductsService(dataGet.queryStringParameters?.idProduct);
            serviceResponse = serviceResponse.Item ? [serviceResponse.Item] : []; 
        }
        if (!dataGet.queryStringParameters?.idProduct) {
            serviceResponse = await getAllProductsService();
        }
    
        // Transforma el formato de los resultados
        transformedData = serviceResponse.map(item => {
            return { ...item, ...Object.fromEntries(Object.entries(item).map(([k, v]) => [k, v.S])) };
        });
        console.log('transformedData', transformedData)
        return makeOkResponse(transformedData);
    } catch (error) {
        return makeErrorResponse(`${error}`, 500);
    }

}
module.exports = { getProductsController };