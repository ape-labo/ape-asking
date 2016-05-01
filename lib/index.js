/**
 * ape framework module for asking.
 * @module ape-asking
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get askYesNo () { return d(require('./ask_yes_no')) }
}
