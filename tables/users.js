/**
 * Created by ivanpetrus on 9/27/16.
 */
var table = require('azure-mobile-apps').table();

table.access = 'disabled';

module.exports = table;