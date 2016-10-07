/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();

/*
 id
 user_id
 contact_id
 contact_type
 */
table.access = 'disabled';

module.exports = table;