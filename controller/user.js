'use strict';

var User = require('../model/user').User;

/** create function to create User. */
exports.create = function (req, res) {

    User.create(req.body, function(err, result) {
        if (!err) {
            console.log(result);
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};


/** getAll function to get all User. */
exports.getAll = function (req, res) {
      User.getAll({}, function(err, result) {
        if (!err) {

            return res.json(result);

        } else {
            return res.send(err); // 500 error
        }
    });
};

/** get function to get all User. */
exports.get = function (req, res) {

    User.get({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** updateUser function to get User by id. */
exports.update = function (req, res) {

    User.updateById({_id: req.params.id}, req.body, function(err, result) {
        if (!err) {

            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
}

/** removeUser function to get User by id. */
exports.delete = function (req, res) {

    User.removeById({_id: req.params.id}, function(err, result) {
        if (!err) {
           User.getAll({}, function(err, result) {
                if (!err) {
                    return res.json(result);
                } else {
                    return res.send(err); // 500 error
                }
            });
        } else {
            console.log(err);
            return res.send(err); // 500 error
        }
    });
}
