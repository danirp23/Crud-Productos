const {
    DynamoDBClient,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    ScanCommand,
    GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: 'us-east-1' });

const insert = async (data) => {
    try {
        return await client.send(new PutItemCommand(data));
    } catch (err) {
        console.error(err);
        return err
    }
}


const update = async (data) => {
    try {
        return await client.send(new UpdateItemCommand(data));
    } catch (err) {
        console.error(err);
        return err
    }
}

const deleteProducts = async (data) => {
    try {
        return await client.send(new DeleteItemCommand(data));
    } catch (err) {
        console.error(err);
        return err
    }
}

const getAllProducts = async (data) => {
    try {
        return await client.send(new ScanCommand(data));
    } catch (err) {
        console.error(err);
        return err
    }
}

const getProduct = async (data) => {
    try {
        return await client.send(new GetItemCommand(data));
    } catch (err) {
        console.error(err);
        return err
    }
}

module.exports = { insert, update, deleteProducts, getProduct, getAllProducts };