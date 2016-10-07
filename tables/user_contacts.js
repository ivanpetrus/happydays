/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();


table.columns = {
    "user_id": "string",
    "contact_id": "string",
    "contact_type": "number"
};

table.access = 'disabled';

module.exports = table;