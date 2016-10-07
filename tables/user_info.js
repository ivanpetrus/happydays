/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();


table.columns = {
    "user_id": "string",
    "first_name": "string",
    "last_name": "string",
    "img_url": "string",
    "dob": "date"
};
table.access = 'disabled';

module.exports = table;