/**
 * Created by ivanpetrus on 10/8/16.
 */
var helper = require("../helper");
var amazon = require('amazon-affiliate-api');
/*
Apparel	Y	Y	Y
Automotive	Y	Y	Y
Automotive	Y	Y	Y
Baby	Y	Y	Y
Beauty	Y	Y	Y
Books	Y	Y	Y
Classical	Y	Y	Y
DigitalMusic	Y	N	N
DVD	Y	Y	Y
Electronics	Y	Y	Y
HealthPersonalCare	Y	Y	Y
HomeGarden	Y	Y	Y
Industrial	Y	Y	Y
Jewelry	Y	Y	Y
Kitchen	Y	Y	Y
Magazines	N	Y	Y
Miscellaneous	Y	Y	Y
Music	Y	Y	Y
MusicalInstruments	Y	Y	Y
MusicTracks	N	N	N
OfficeProducts	Y	Y	Y
OutdoorLiving	Y	Y	Y
PCHardware	Y	Y	Y
PetSupplies	Y	Y	Y
Photo	Y	Y	Y
Software	Y	Y	Y
Tools	Y	Y	Y
Toys	Y	Y	Y
VHS	Y	Y	Y
Video	Y	Y	Y
Watches
*/
module.exports = {

    get: function (req, res, next) {

        if (helper.validateAuth(req, res)) {

            var client = amazon.createClient({
                awsId: "AKIAJRTDXR4LTKK7GHTA",
                awsSecret: "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",
                awsTag: "mockupbuilder-20"
            });
            client.itemSearch({
                searchIndex: 'Toys',
                keywords: ' ',
                condition: 'New',
                responseGroup: 'Medium',
                itemPage: '20',
                version: "2013-08-01"
            }).then(function(results){
                console.log(results);
                res.send(results);
            }).catch(function(err){
                console.log(err);
                res.send(err);
            });
        }
    }

}

