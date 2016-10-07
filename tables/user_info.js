/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();

/*
id
user_id
first_name
last_name
dob
img_url
*/
table.access = 'disabled';

module.exports = table;