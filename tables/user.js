/**
 * Created by ivanpetrus on 9/27/16.
 */
var table = require('azure-mobile-apps').table();

table.columns = {
    "emajl": "string",
    "password": "string",
    "isghost": "boolean"
};

table.access = 'disabled';

module.exports = table;