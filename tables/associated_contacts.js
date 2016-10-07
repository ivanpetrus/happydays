/**
 * Created by ivanpetrus on 10/7/16.
 */

var table = require('azure-mobile-apps').table();

table.columns = {
    "event_id": "string",
    "user_id": "string"
};

table.access = 'disabled';

module.exports = table;