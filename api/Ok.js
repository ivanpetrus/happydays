/**
 * Created by ivanpetrus on 9/27/16.
 */

// validate api key header prior to api method execution
module.exports = {
    // api methods can be defined with an array of middleware functions
    get:  function (req, res, next) {
        res.status(200).send();
    }
}
