/**
 * Created by ivanpetrus on 10/8/16.
 */
var helper = require("../helper");
var amazon = require('amazon-affiliate-api');
var url = require('url');

var client = amazon.createClient({
    awsId: "AKIAJRTDXR4LTKK7GHTA",
    awsSecret: "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",
    awsTag: "mockupbuilder-20"
});

module.exports = {

    get: function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log(query);
        if (helper.validateAuth(req, res)) {
            client.itemSearch(query).then(function(results){
                console.log(results);
                res.send(results);
            }).catch(function(err){
                console.log(err);
                res.send(err);
            });
        }
    },
    post: function (req, res, next) {

    },
    put: function (req, res, next) {

    },
    delete: function (req, res, next) {

    }

}

