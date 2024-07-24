const { makeErrorResponse, makeOkResponse } = require("../../middleware/response");
const { update } = require("../../services/dynamoDBService");
const { errorService, successUpdate, notExistItem } = require("../../utils/errorMessages");

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const updateProductsService = async (dataUpdate) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                idProduct: { S: dataUpdate.idProduct }
            },
            UpdateExpression: "SET rut = :rutValue, #n = :nameValue",
            ExpressionAttributeValues: {
                ":rutValue": { S: dataUpdate.rut },
                ":nameValue": { S: dataUpdate.name }
            },
            ExpressionAttributeNames: {
                "#n": "name" // "name" es una palabra reservada en DynamoDB, por eso se utiliza un alias
            },
            ConditionExpression: "attribute_exists(idProduct)" 
        };
        const responseDynamo = await update(params);
        console.log(responseDynamo);
        if (responseDynamo.name === 'ConditionalCheckFailedException')
            return makeErrorResponse(notExistItem, 422);
        if (responseDynamo.$metadata.httpStatusCode === 200)
            return makeOkResponse(successUpdate);
        return responseDynamo;
    } catch (error) {
        return makeErrorResponse(`${errorService} ${error}`)
    }
}

module.exports = { updateProductsService };
