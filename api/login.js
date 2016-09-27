/**
 * Created by ivanpetrus on 9/27/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var basic_auth = require('basic-auth');

var username ='boboone';
var pass ='pass';
module.exports = {
    // validates a username and password and returns a JWT token if successful
    post: function (req, res, next) {

        var credentials = basic_auth(req);
        if (!credentials || credentials.name !== username || credentials.pass !== pass) {
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
                if (users.length === 1 && validatePassword(req.body.password, users[0].password))
                    res.json(createResponse(sign, users[0]));
                else
                    res.status(401).send("Incorrect username or password");
            })
            .catch(next);
    },

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
                password: hashPassword(req.body.password)
            })
            .then(function (user) {
                res.json(createResponse(sign, user));
            })
            .catch(next);
    }
}

function createResponse(sign, user) {
    return {
        // this JWT token must be applied on the Mobile Apps client using the appropriate client APIs
        token: sign({
            // sub is the only required property. this becomes context.user.id
            // you can add other claims here. they become available as context.user.claims
            sub: user.username
        })
    };
}

function hashPassword(password) {
    var buffer = new Buffer(password);
    var base64 = buffer.toString('base64');
    return base64;
}

function validatePassword(password, hashed) {

    return  hashPassword(password) == hashed;
}



