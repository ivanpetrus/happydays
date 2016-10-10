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
            client.itemSearch(query).then(function (results) {
                console.log(results.Items.Item);
                res.send(results.Items.Item);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err.Items.Request.Errors[0].Message);
            });
        }
    },
    post: function (req, res, next) {
        client.cartCreate(req.body).then(function (results) {
            console.log(results);
            res.send(results);
        }).fail(function (err) {
            console.log(err);
            res.status(500).send(err.Cart.Request.Errors[0].Message);
        });
    },
    put: function (req, res, next) {

    },
    delete: function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log(query);
        client.cartClear(query).then(function (results) {
            console.log(results);
            res.status(200).send(true);
        }).fail(function (err) {
            console.log(err);
            res.status(500).send(err.Cart.Request.Errors[0].Message);
        });
    }

}

