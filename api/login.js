/**
 * Created by ivanpetrus on 9/27/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");


module.exports = {
    // validates a username and password and returns a JWT token if successful
    post: function (req, res, next) {

        if (helper.validateAuth(req, res)) {
            var origin = req.body.origin;
            var context = req.azureMobile,
                // the sign function creates a signed JWT token from provided claims
                sign = auth(context.configuration.auth).sign;
            if (origin == 'local') {
                context.tables('user')
                    .where({email: req.body.email})
                    .read()
                    .then(function (users) {
                        if (users.length === 1 && helper.validatePassword(req.body.password, users[0].password))
                            res.json(helper.createResponse(sign, users[0]));
                        else
                            res.status(401).send("Incorrect username or password");
                    })
                    .catch(next);
            }
            else {
                var external_auth_table = context.tables('external_auth');

                external_auth_table.where({provider_id: req.body.provider_id})
                    .read()
                    .then(function (ex_auth) {
                        if (ex_auth.length === 1) {
                            context.tables("user")
                                .where({id: ex_auth[0].user_id})
                                .read()
                                .then(function (users) {
                                    if (users.length == 1) {
                                        res.json(helper.createResponse(sign, users[0]));
                                    }
                                })
                                .catch(next)

                        }
                        else
                            res.status(401).send("Incorrect username or password");
                    })
                    .catch(next);
            }
        }
    }

}







