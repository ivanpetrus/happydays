/**
 * Created by ivanpetrus on 10/7/16.
 */
var auth = require('azure-mobile-apps/src/auth');
var helper = require("../helper");
module.exports = {

    get: function (req, res, next) {
        if (helper.validateAuth(req, res)) {

        }

    },

    post: function (req, res, next) {
        if (helper.validateAuth(req, res)) {
            var context = req.azureMobile;
            var user_contacts_table = context.tables('user_contacts');
            user_contacts_table.where({user_id:req.body.user_id, contact_id: req.body.contact_id})
                .read()
                .then(function (conacts) {
                    if (conacts.length > 0)
                        res.status(403).send("Contact already exist");
                    else {
                        user_contacts_table.insert({
                            user_id:req.body.user_id,
                            contact_id: req.body.contact_id,
                            contact_type: req.body.contact_type
                        })
                            .then(function (contact) {
                                res.json(contact)
                            })
                            .catch(next)
                    }
                })
                .catch(next)
        }

    },
    delete: function (req, res, next)
    {
        if (helper.validateAuth(req, res)) {
            var context = req.azureMobile;
            var user_contacts_table = context.tables('user_contacts');
            user_contacts_table.delete({id:req.body.id})
                .than(function (res) {
                res.json(res)
            })
                .catch(next)
        }

    }
}
