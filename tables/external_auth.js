/**
 * Created by ivanpetrus on 10/7/16.
 */
var table = require('azure-mobile-apps').table();

/*
 id
 user_id
 origin_id
 provider_id
 */
table.access = 'disabled';


module.exports = table;