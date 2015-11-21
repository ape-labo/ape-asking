/**
 * @memberof module:ape-asking/lib
 * @function askYesNo
 * @param {string} [msg=askYesNo.DEFAULT_MSG] - Ask message.
 * @param {object} actions - Actions for each answer.
 * @param {function} actions.yes - Action for yes.
 * @param {function} actions.no - Action for no.
 */

"use strict";

const argx = require('argx'),
    yesno = require('yesno');

/** @lends askYesNo */
function askYesNo(msg, actions) {
    let args = argx(arguments);
    msg = args.shift('string') || askYesNo.DEFAULT_MSG;
    actions = args.pop('object') || {};
    let yes = actions.yes || args.shift('function') || argx.noop,
        no = actions.no || args.shift('function') || argx.noop;
    yesno.ask(msg, false, (sure) => {
        if (sure) {
            yes();
        } else {
            no();
        }
    });
}

askYesNo.DEFAULT_MSG = 'Are you sure ? (y/N) ';

module.exports = askYesNo;