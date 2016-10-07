/**
 * Created by ivanpetrus on 10/7/16.
 */
var helper = require("../helper");

module.exports = {

// create a new user with the specified username and password and return a JWT token

    put: function (req, res, next) {
        var credentials = basic_auth(req);
        if (!credentials || credentials.name !== username || credentials.pass !== pass) {
            res.statusCode = 401;
            res.end('Access denied');
            return;
        }

        var context = req.azureMobile,
            sign = auth(context.configuration.auth).sign;

        context.tables('users')
            .insert({
                id: req.body.username,
                password: helper.hashPassword(req.body.password)
            })
            .then(function (user) {
                res.json(helper.createResponse(sign, user));
            })
            .catch(next);
    }
}