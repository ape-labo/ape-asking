/**
 * @memberof module:ape-asking/lib
 * @function askYesNo
 * @param {string} [msg=askYesNo.DEFAULT_MSG] - Ask message.
 * @param {object} actions - Actions for each answer.
 * @returns {Promise.<boolean>}
 */

'use strict'

const argx = require('argx')
const yesno = require('yesno')
const co = require('co')

let warnActions = () => '[ape-asking] actions are now deprecated. Use promise insetead.'

/** @lends askYesNo */
function askYesNo (msg) {
  let args = argx(arguments)
  msg = args.shift('string') || askYesNo.DEFAULT_MSG

  let actions = args.pop('object') || {}
  let yes = actions.yes || args.shift('function')
  let no = actions.no || args.shift('function')

  return co(function * () {
    let sure = yield new Promise((resolve) =>
      yesno.ask(msg, false, (sure) => resolve(sure))
    )
    yesno.ask(msg, false, (sure) => {
      if (sure && yes) {
        warnActions()
        yes()
      }
      if (!sure && no) {
        warnActions()
        no()
      }
    })
    return sure
  })
}

askYesNo.DEFAULT_MSG = 'Are you sure ? (y/N) '

module.exports = askYesNo
