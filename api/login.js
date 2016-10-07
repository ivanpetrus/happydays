/**
 * Created by ivanpetrus on 9/27/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var basic_auth = require('basic-auth');
var helper = require("../helper");


module.exports = {
    // validates a username and password and returns a JWT token if successful
    post: function (req, res, next) {

        var credentials = basic_auth(req);
        if (!credentials || credentials.name !== global.user || global.pass !== pass) {
            res.statusCode = 401;
            res.end('Access denied');
            return;
        }
        var context = req.azureMobile,
            // the sign function creates a signed JWT token from provided claims
            sign = auth(context.configuration.auth).sign;

        context.tables('users')
            .where({id: req.body.username})
            .read()
            .then(function (users) {
                if (users.length === 1 && helper.validatePassword(req.body.password, users[0].password))
                    res.json(helper.createResponse(sign, users[0]));
                else
                    res.status(401).send("Incorrect username or password");
            })
            .catch(next);
    },

}







