#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cliox = require('cliox');
var app = cliox();
var dir, pkg, youmeb, done;

dir = path.join(process.cwd(), 'node_modules/youmeb');

if (!fs.existsSync(dir)) {
  console.log('Unable to find local youmeb.');
  process.exit(1);
}

// 取得 package.json
pkg = require(path.join(dir, 'package.json'));

// 設定 process.title
process.title = pkg.name;

// 載入 youmeb-cli
youmeb = require(path.join(dir, 'lib/youmeb-cli.js'));

// cliox
app
  .version(pkg.version, ['-V'])
  .verbose(['-v'])
  .format(['json'])
  .help(path.join(dir, 'docs/cli'), 'help.%s.txt');

app.bind(youmeb);

done = function (err) {
  if (err) {
    console.log('Error: ' + err.message);
  }
};

app.noCommand(function () {
  app.run(['server', './'], done);
});

app.notFound(function (command, app, done) {
  return youmeb.notfound(command, app, done);
});

app.run(process.argv.slice(2), done);
