/**
 * Created by ivanpetrus on 10/7/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");

module.exports = {
    post: function (req, res, next) {

        if (helper.validateAuth(req, res)) {
            var context = req.azureMobile;
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