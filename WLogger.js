var winston = require('winston');

//https://github.com/winstonjs/winston/blob/master/docs/transports.md#winston-core

class LoggerFactory {
    constructor() {
    }

    static getLogger(name) {
        return new L(name);
    }
}
class L {
    constructor(name) {
        this.name = name;
        this.logger = new (winston.Logger)({
            transports: [

                //level: Level of messages that this transport should log (default 'info').
                //silent: Boolean flag indicating whether to suppress output (default false).
                //colorize: Boolean flag indicating if we should colorize output (default false).
                //timestamp: Boolean flag indicating if we should prepend output with timestamps (default false). If function is specified, its return value will be used instead of timestamps.
                //json: Boolean flag indicating whether or not the output should be JSON. If true, will log out multi-line JSON objects. (default false)
                //stringify: Boolean flag indiciating if the output should be passed through JSON.stringify, resulting in single-line output. Most useful when used in conjunction with the json flag. (default false)
                //prettyPrint: Boolean flag indicating if we should util.inspect the meta (default false). If function is specified, its return value will be the string representing the meta.
                //depth Numeric indicating how many times to recurse while formatting the object with util.inspect (only used with prettyPrint: true) (default null, unlimited)
                //humanReadableUnhandledException Boolean flag indicating if uncaught exception should be output as human readable, instead of a single line
                //showLevel: Boolean flag indicating if we should prepend output with level (default true).
                //formatter: If function is specified, its return value will be used instead of default output. (default undefined)
                //stderrLevels Array of strings containing the levels to log to stderr instead of stdout, for example ['error', 'debug', 'info']. (default ['error', 'debug'])

                new (winston.transports.Console)({
                    timestamp: function () {
                        return Date.now();
                    },
                    colorize: true,
                    formatter: function (options) {
                        // Return string will be passed to logger.
                        return new Date().toISOString() + ' [' + name + '] ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
                            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
                    }
                })
            ]
        });

    }

    info(data) {
        this.logger.info(data);
    }

}