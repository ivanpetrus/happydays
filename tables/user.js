/**
 * Created by ivanpetrus on 9/27/16.
 */
var table = require('azure-mobile-apps').table();

/*
 id
 emajl
 password
 isghost
 */
table.access = 'disabled';

module.exports = table;