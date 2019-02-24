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

let warnActions = () => '[ape-asking] actions are now deprecated. Use promise insetead.'

/** @lends askYesNo */
async function askYesNo(msg) {
  const args = argx(arguments)
  msg = args.shift('string') || askYesNo.DEFAULT_MSG

  const actions = args.pop('object') || {}
  const yes = actions.yes || args.shift('function')
  const no = actions.no || args.shift('function')

  const sure = await new Promise((resolve) =>
    yesno.ask(msg, false, (sure) => resolve(sure))
  )
  if (sure && yes) {
    warnActions()
    yes()
  }
  if (!sure && no) {
    warnActions()
    no()
  }
  return sure
}

askYesNo.DEFAULT_MSG = 'Are you sure ? (y/N) '

module.exports = askYesNo
