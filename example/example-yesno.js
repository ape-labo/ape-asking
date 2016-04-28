#!/usr/bin/env node
'use strict'

const apeAsking = require('ape-asking')

apeAsking.askYesNo('Are you sure to do that? [y/N]')
  .then((sure) => {
    /* ... */
  })
