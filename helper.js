/**
 * Created by ivanpetrus on 10/7/16.
 */
var basic_auth = require('basic-auth');

exports.hashPassword = function (password) {
    var buffer = new Buffer(password);
    var base64 = buffer.toString('base64');
    return base64;
}

exports.validatePassword = function (password, hashed) {

    return  exports.hashPassword(password) == hashed;
}

exports.createResponse = function (sign, user) {
    return {
        // this JWT token must be applied on the Mobile Apps client using the appropriate client APIs
        MobileServiceAuthenticationToken: sign({
            // sub is the only required property. this becomes context.user.id
            // you can add other claims here. they become available as context.user.claims
            sub: user.id

        }),
        UserId: user.id,
    };
}
exports.validateAuth = function (req, res) {
    var credentials = basic_auth(req);
    if (!credentials || credentials.name !== global.user || global.pass !== pass) {
        res.statusCode = 401;
        res.end('Access denied');
        return false;
    }
    return true;
}