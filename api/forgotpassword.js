/**
 * Created by ivanpetrus on 10/11/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");

module.exports = {
    // api methods can be defined with an array of middleware functions
    post:  function (req, res, next) {
        if (helper.validateAuth(req, res)) {
            var context = req.azureMobile;
           var usertable = context.tables('user');
            usertable.where({email: req.body.email})
                .read()
                .then(function (users) {
                    if (users.length === 1) {
                        users[0].password = "";
                        usertable.update(users[0]);
                        res.json({message: "You password has been deleted. Currenlty you could log in without passwords." +
                            " Please update your password in settings"});
                    }
                    else
                        res.status(401).send("Provided email did not match");
                })
                .catch(next);
        }
    }
}