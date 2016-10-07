/**
 * Created by ivanpetrus on 10/7/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");


module.exports = {
    // validates a username and password and returns a JWT token if successful
    post: function (req, res, next) {

        if (helper.validateAuth(req, res)) {
            var context = req.azureMobile,
                // the sign function creates a signed JWT token from provided claims
                sign = auth(context.configuration.auth).sign;
            var external_auth_table = context.tables('external_auth');

            external_auth_table.where({provider_id: req.body.provider_id})
                .read()
                .then(function (ex_auth) {
                    if (ex_auth.length === 1 ) {
                        var user_table = context.tables("user");
                        user_table.where({id:ex_auth[0].user_id})
                            .read()
                            .then(function (users) {
                                if (users.length==1){
                                    res.json(helper.createResponse(sign, users[0]));
                                }
                            })
                            .catch(next)

                    }
                    else
                        res.status(401).send("Not Found");
                })
                .catch(next);
        }
    }

}
