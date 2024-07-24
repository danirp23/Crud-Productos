const { makeErrorResponse, makeOkResponse, makeErrorArrayResponse } = require("../../middleware/response");
const { insert } = require("../../services/dynamoDBService");
const { duplicateItem, errorService, successInsert, errorDynamo } = require("../../utils/errorMessages");

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const insertProductsService = async (dataInsert) => {
    try {
        let response = [], responseFail = 0;
        const insertPromises = dataInsert.map(async (item) => {
            const params = {
                TableName: TABLE_NAME,
                Item: {
                    idProduct: { S: item.idProduct },
                    rut: { S: item.rut },
                    name: { S: item.name }
                },
                ConditionExpression: 'attribute_not_exists(idProduct)'
            };
            const responseDynamo = await insert(params);
            if (responseDynamo.name === 'ConditionalCheckFailedException') {
                responseFail += 1;
                response.push(makeErrorArrayResponse(`${duplicateItem}: idProduct: ${item.idProduct}`));
            }
            if (responseDynamo.$metadata.httpStatusCode === 200) {
                response.push(makeOkResponse(`${successInsert}: idProduct: ${item.idProduct}`));
            }
            if (responseDynamo.$metadata.httpStatusCode !== 200 && responseDynamo.name !== 'ConditionalCheckFailedException') {
                responseFail += 1;
                response.push(makeErrorArrayResponse(`${errorDynamo} ${responseDynamo}`));
            }
        })

        await Promise.all(insertPromises);
        if (responseFail > 0) {
            return makeErrorResponse(response, 406);
        }
        return makeOkResponse(response);
    } catch (error) {
        return makeErrorResponse(`${errorService} ${error}`)
    }
}

module.exports = { insertProductsService };
