const { makeErrorResponse } = require("../../middleware/response");
const { getProduct, getAllProducts } = require("../../services/dynamoDBService");
const { errorService } = require("../../utils/errorMessages");

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const getAllProductsService = async () => {
    try {
        const params = {
            TableName: TABLE_NAME
        };
        console.log(params);
        const responseDynamo = await getAllProducts(params);
        console.log(responseDynamo);

        return responseDynamo.Items || responseDynamo;
    } catch (error) {
        return makeErrorResponse(`${errorService} ${error}`)
    }
}

const getOneProductsService = async (dataGet) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                idProduct: { S: dataGet}
            },
        };
        console.log(params);
        const responseDynamo = await getProduct(params);
        console.log(responseDynamo);

        return responseDynamo;
    } catch (error) {
        return makeErrorResponse(`${errorService} ${error}`)
    }
}

module.exports = { getAllProductsService, getOneProductsService };
