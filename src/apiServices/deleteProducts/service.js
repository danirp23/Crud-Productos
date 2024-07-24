const { makeErrorResponse, makeOkResponse } = require("../../middleware/response");
const { deleteProducts } = require("../../services/dynamoDBService");
const { errorService, successDelete, notExistItem } = require("../../utils/errorMessages");

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const deleteProductsService = async (dataDelete) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                idProduct: { S: dataDelete.idProduct }
            },
            ConditionExpression: "attribute_exists(idProduct)"
        };
        const responseDynamo = await deleteProducts(params);
        if (responseDynamo.name === 'ConditionalCheckFailedException')
            return makeErrorResponse(notExistItem, 422);
        if (responseDynamo.$metadata.httpStatusCode === 200)
            return makeOkResponse(successDelete);
        console.log(responseDynamo);

        return responseDynamo;
    } catch (error) {
        return makeErrorResponse(`${errorService} ${error}`)
    }
}

module.exports = { deleteProductsService };
