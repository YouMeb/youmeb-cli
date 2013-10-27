#!/usr/bin/env node

// 設定 process.title
process.title = 'youmeb';

var fs = require('fs');
var path = require('path');
var cliopt = require('cliopt');
var colors = require('colors');
var commands = require('../lib/commands');
var dir, pkg, clipkg, cli, exists, done;

// 定義 cli options
var parser = cliopt({
  help: {
    type: Boolean,
    default: false
  },
  version: {
    type: Boolean,
    default: false
  },
  root: {
    type: String,
    default: process.cwd()
  }
});
parser.use(cliopt.pair());
parser.use(cliopt.convert());

dir = path.join(process.cwd(), 'node_modules/youmeb');

exists = fs.existsSync(dir);

if (exists) {
  // 取得 package.json
  pkg = require(path.join(dir, 'package.json'));

  // 載入 youmeb-cli
  cli = require(path.join(dir, 'lib/youmeb-cli.js'));
  cli.youmeb.inquirer = require('inquirer');
}
clipkg = require(path.join(__dirname, '../package.json'));

var done = function (err) {
  if (err) {
    console.log('\n  Error: '.red + (err.message || 'no message') + '\n');
  }
};

parser.parse(process.argv.slice(2), function (err) {
  if (err) {
    throw err;
  }
  //判斷這個資料夾目錄是否為YouMebJS專案
  if(process.argv.slice(2).length == 0 && !exists){
      console.log('Sorry, this path '+process.cwd().blue+' dont have the YouMebJS project.\nPlease type '+'\'youmeb new\''.green+' to add a new YouMebJS project.');
  }

  // version
  if (parser.get('version')) {
    console.log('cli version: ' + clipkg.version);
    if (pkg) {
      console.log('youmeb version: ' + pkg.version);
    }
    return done();
  }
  
  var command = parser.args.shift();
  
  // help
  if (parser.get('help')) {

    (function (help) {
      if (cli) {
        cli.boot(function (err) {
          if (err) {
            return done(err);
          }
          help();
        });
      } else {
        help();
      }
    })(function () {

      var data = {
        header: ['  youmeb [options] [command]'],
        // [name, args, msg]
        commands: [
          ['new', '[app]', 'create new applocation.'],
          ['new:package', '[package]', 'create new package.'],
          ['doc', '', 'See YouMebJS documents.']
        ]
      };

      (function (log) {
        if (cli) {
          cli.youmeb.emit('help', command, data, log);
        } else {
          log();
        }
      })(function (err) {
        if (err) {
          return done(err);
        }

        var txtlen = [];
        var str;
        
        data.commands.forEach(function (item) {
          item.forEach(function (field, i) {
            var len = field.length;
            if ((txtlen[i] | 0) < len) {
              txtlen[i] = len;
            }
          });
        });

        data.commands.forEach(function (item, i) {
          item.forEach(function (field, j) {
            var k = txtlen[j] - field.length;
            while (k--) {
              field += ' ';
            }
            switch (j) {
              case 0:
                field = '    ' + field.green;
                break;
              case 1:
                field = field.grey;
                break;
            }
            item[j] = field;
          });
          data.commands[i] = item.join('  ');
        });

        data.commands = data.commands.sort();

        str = data.commands.join('\n');

        str = '\n'
          + data.header.join('\n') + '\n\n'
          + '  Commands:\n\n'
          + str + '\n';

        console.log(str);
        done();
      });
    
    });
    return;
  }

  // 沒有 command
  if (!command) {
    if (cli) {
      cli.server(parser, parser.args, done);
    } else {
      done();
    }
    return;
  }
  
  // 檢查 youmeb-cli 是否有這個 command
  if (commands.hasOwnProperty(command)) {
    return commands[command](parser.args, done);
  }else{
    console.log('Sorry, there is no '+command.blue+' in YouMebJS Commands.\nPlease type '+'\'youmeb --help\''.green+' to find you want to do.');
  }

  // 使用 youmebJS 的 command 
  if (cli) {
    cli.boot(function (err) {
      //console.log(err);
      if (err) {
        return done(err);
      }
      cli.youmeb.emit('cli-' + command, parser, parser.args, done);
    });
    return;
  }

  done();
});
