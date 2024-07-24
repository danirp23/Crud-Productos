const { insertProductsHandler } = require("./src/apiServices/insertProducts/handler");

const objectValid = insertProductsHandler({
    body: '{\r\n    "idProduct": "1212",\r\n    "rut": "40",\r\n    "name": "test"\r\n}'
}, {});

console.log(objectValid);