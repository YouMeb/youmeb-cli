'use strict';

var path = require('path');

var commands = module.exports = {};

commands['new'] = require('./commands/new');
commands['new:package'] = require('./commands/new-package');
