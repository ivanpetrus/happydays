/**
 * Created by ivanpetrus on 10/7/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");

module.exports = {

// create a new user with the specified username and password and return a JWT token

    put: function (req, res, next) {
        if (helper.validateAuth(req, res)) {
            var origin = req.body.origin;
            var context = req.azureMobile,
                sign = auth(context.configuration.auth).sign;
            var user_table = context.tables('user');
            var external_auth_table = context.tables('external_auth');

            if (origin == 'local') {
                user_table.where({email: req.body.email})
                    .read()
                    .then(function (users) {
                        if (users.length > 0) {
                            res.status(403).send("User already exist");
                        }
                        else {
                            user_table.insert({
                                email: req.body.email,
                                password: helper.hashPassword(req.body.password)
                            })
                                .then(function (user) {
                                    var user_info_table = context.tables('user_info');
                                    user_info_table.insert({
                                        user_id: user.id,
                                        first_name: req.body.first_name,
                                        last_name: req.body.last_name,
                                        dob: req.body.dob,
                                        img_url: req.body.img_url
                                    })
                                        .then(function (userinfo) {
                                            res.json(helper.createResponse(sign, user));
                                        })
                                        .catch(next)

                                })
                                .catch(next);
                        }
                    })
                    .catch(next);

            }
            else{
                external_auth_table.where({provider_id: req.body.provider_id})
                    .read()
                    .then(function (users) {
                        if (users.length > 0) {
                            res.status(403).send("User already exist");
                        }
                        else {
                            user_table.insert({
                                email: req.body.email
                            })
                                .then(function (user) {
                                    var user_info_table = context.tables('user_info');
                                    user_info_table.insert({
                                        user_id: user.id,
                                        first_name: req.body.first_name,
                                        last_name: req.body.last_name,
                                        dob: req.body.dob,
                                        img_url: req.body.img_url
                                    })
                                        .then(function (userinfo) {
                                            external_auth_table.insert({
                                                user_id: user.id,
                                                origin_id: req.body.origin_id,
                                                provider_id: req.body.provider_id
                                            })
                                                .then(function (ex_auth) {
                                                    res.json(helper.createResponse(sign, user));
                                                })
                                                .catch(next)

                                        })
                                        .catch(next)

                                })
                                .catch(next);
                        }
                    })
                    .catch(next);

            }
        }
    }
}