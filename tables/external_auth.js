/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();


table.columns = {
    "user_id": "string",
    "origin_id": "number",
    "provider_id": "string"
};


module.exports = table;