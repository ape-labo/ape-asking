/**
 * Test case for askYesNo.
 * Runs with nodeunit.
 */

const askYesNo = require('../lib/ask_yes_no.js'),
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
    injectmock(yesno, 'ask', (msg, defaults, callback) => {
        callback(true);
    });
    askYesNo({
        yes: () => {
            test.ok(true);
            test.done();
        },
        no: () => {
            test.ok(false);
        }
    });
};

exports['Handle no'] = function (test) {
    injectmock(yesno, 'ask', (msg, defaults, callback) => {
        callback(false);
    });
    askYesNo({
        yes: () => {
            test.ok(false);
        },
        no: () => {
            test.ok(true);
            test.done();
        }
    });
};

