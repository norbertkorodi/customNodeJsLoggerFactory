"use strict";

var log4js = require('log4js');
var process = require('process');


 
//https://github.com/nomiddlename/log4js-node



class LoggerFactory{
	
	constructor() {
		
	}
	
	static getLogger(name){
		log4js.configure({
			appenders: [
				{
					type: 'console',
					layout: {
						type: 'pattern',
						pattern: "[%d] [%[%5.5p%]] [%c] %m [PID:%x{pid}]",
						tokens: {
							pid: function(){
									return process.pid
								}
						}
					}
				}
			]
		})

		var logger = log4js.getLogger(name);
		return logger;
	}
}

module.exports=LoggerFactory

