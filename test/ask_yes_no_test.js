/**
 * Test case for askYesNo.
 * Runs with nodeunit.
 */

var askYesNo = require('../lib/ask_yes_no.js'),
    yesno = require('yesno'),
    injectmock = require('injectmock');

exports.setUp = function (done) {
    injectmock.restoreAll();
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Handle yes'] = function (test) {
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
        callback(true);
    });
    askYesNo({
        yes: function () {
            test.ok(true);
            test.done();
        },
        no: function () {
            test.ok(false);
        }
    });
};

exports['Handle no'] = function (test) {
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
        callback(false);
    });
    askYesNo({
        yes: function () {
            test.ok(false);
        },
        no: function () {
            test.ok(true);
            test.done();
        }
    });
};

