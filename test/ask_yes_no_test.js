/**
 * Test case for askYesNo.
 * Runs with mocha
 */
'use strict'

const askYesNo = require('../lib/ask_yes_no.js')
const yesno = require('yesno')
const co = require('co')
const assert = require('assert')
const injectmock = require('injectmock')

describe('askYesNo', () => {
  before((done) => {
    injectmock.restoreAll()
    done()
  })

  after((done) => {
    done()
  })

  it('Handle yes', () => co(function * () {
    injectmock(yesno, 'ask', (msg, defaults, callback) => {
      callback(true)
    })
    let yes = yield askYesNo()
    assert.ok(yes)
  }))

  it('Handle no', () => co(function * () {
    injectmock(yesno, 'ask', (msg, defaults, callback) => {
      callback(false)
    })
    let yes = yield askYesNo()
    assert.ok(!yes)
  }))
})

/* global describe, it, before, after */
