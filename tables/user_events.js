/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();


table.columns = {
    "user_id": "string",
    "event_type": "number",
    "repetition_type": "number",
    "notification_type": "number",
    "date": "date"
};

table.access = 'disabled';

module.exports = table;