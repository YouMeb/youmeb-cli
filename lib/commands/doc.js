'use strict';

var colors = require('colors');
var open = require('open');
var inquirer = require('inquirer');

module.exports = function () {
  var choices = [
    'Build a new YouMebJS project',
    'Run YouMebJS server',
    'See all YouMeb Package lists'
  ];

  inquirer.prompt([
    {
      type: 'list',
      name: 'doc',
      message: 'YouMebJS Documents',
      choices: choices
    }
  ], function (anwsers) {
    var index = choices.indexOf(anwsers.doc);
    var urls = [
      'https://github.com/YouMeb/youmeb.js/wiki/%E9%96%8B%E5%A7%8B%E4%BD%BF%E7%94%A8-YouMeb-!#%E5%BB%BA%E7%AB%8B%E7%AC%AC%E4%B8%80%E5%80%8B%E5%B0%88%E6%A1%88',
      'https://github.com/YouMeb/youmeb.js/wiki/%E9%96%8B%E5%A7%8B%E4%BD%BF%E7%94%A8-YouMeb-!#%E5%95%9F%E5%8B%95-server',
      'https://github.com/YouMeb/youmeb.js/wiki/YouMebJS-package-lists'
    ];
    open(urls[index] || 0);
  });
};
