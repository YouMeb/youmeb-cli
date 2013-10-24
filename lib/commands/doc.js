'use strict';

//var generate = require('../generate');
var colors = require('colors');
var open = require('open');
// var cliopt = require('cliopt');
var prompt = require('prompt');

module.exports =  function () {
	//console.log('123');
	// var url = 'http://www.yahoo.com.tw/';
	
	// console.log('\n'.white);
	console.log('YouMebJS Documents'.blue);
	console.log('1'.green+'. Build a new YouMebJS project');
	console.log('2'.green+'. Run YouMebJS server');
	console.log('3'.green+'. See all YouMeb Package lists');
	console.log('\nType\' '+'exit'.green+' \' to go back!')

	console.log('\n'.white);
	promptstart();
	function promptstart(){
		prompt.start();
	  	prompt.get(['choose'], function (err, result) {
	    
	    switch(result.choose){
	    	case '1':
	    		open('https://github.com/YouMeb/youmeb.js/wiki/%E9%96%8B%E5%A7%8B%E4%BD%BF%E7%94%A8-YouMeb-!#%E5%BB%BA%E7%AB%8B%E7%AC%AC%E4%B8%80%E5%80%8B%E5%B0%88%E6%A1%88');
				return promptstart();
				break;
	    	case '2':
	    		open('https://github.com/YouMeb/youmeb.js/wiki/%E9%96%8B%E5%A7%8B%E4%BD%BF%E7%94%A8-YouMeb-!#%E5%95%9F%E5%8B%95-server');
				return promptstart();
				break;
			case '3':
				open('https://github.com/YouMeb/youmeb.js/wiki/YouMebJS-package-lists');
				return promptstart();
				break;
			case 'exit' || 'Exit':
				return false;
				break;
			default:
				console.log('sorry,please type again!');
				return promptstart();
				break;
	    }
	  });
	}

};
