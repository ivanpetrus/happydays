/**
 * Created by ivanpetrus on 10/7/16.
 */


var table = require('azure-mobile-apps').table();

table.columns = {
    "enum_id": "number",
    "name": "string"
};

table.access = 'disabled';

module.exports = table;
