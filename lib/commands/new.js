'use strict';

var fs = require('fs');
var colors = require('colors');
var path = require('path');
var generator = require('../generator');

module.exports = function (args, done) {
  generator.source = path.join(__dirname, '../templates/app');
  generator.destination = path.join(process.cwd(), args[0] || '');

  generator.on('create', (function () {
    var firstlog = true;
    return function (file) {
      // 為了美觀 XD
      if (firstlog) {
        console.log();
        firstlog = false;
      }
      console.log('  Create '.yellow + file);
    };
  })());

  (function (create) {
    if (fs.existsSync(generator.destination)) {
      fs.readdir(generator.destination, function (err, files) {
        if (err) {
          return done(err);
        }
        if (files.length) {
          return done(new Error('Folder is not empty'));
        }
        create();
      });
      return;
    }
    create();
  })(function () {
    generator.createFolderRecursive('./', {}, function (err) {
      if (err) {
        return done(err);
      }
      console.log(); // 為了美觀 XD
      done();
    });
  });
};
