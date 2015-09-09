#!/usr/bin/env node

var apeAsking = require('ape-asking');

apeAsking.askYesNo('Are you sure to do that? [y/N]',{
    yes:function(){

    },
    no:function(){

    }
});