'use strict';

var path = require('path');

var commands = module.exports = {};

function r(name, module) {
  if (name) {
    commands[name] = require(module === true ? name : path.join(__dirname, 'commands', name));
  }
  return r;
}

r()
  ('new');
