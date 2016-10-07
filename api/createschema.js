/**
 * Created by ivanpetrus on 10/7/16.
 */
var mobileapp = require('azure-mobile-apps')();
var helper = require("../helper");

module.exports = {
    post: function (req, res, next) {

        if (helper.validateAuth(req, res)) {
            var context = mobileapp;
            context.tables.add("user");
            context.tables.add("user_contacts");
            context.tables.add("user_info");
            context.tables.add("user_origin");
            context.tables.add("external_auth");

            res.send(200);
        }
        res.send(500);
    }
}