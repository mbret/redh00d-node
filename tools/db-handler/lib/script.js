(function(){
    'use strict';

    var events  = require('events');
    var path    = require('path');
    var _       = require('lodash');

    var Script =  function(){};

    // Inherit events prototype so the script process can emit events
    // events are useful for example to end a db connection if we are not handling it inside
    // main process.
    Script.prototype = new events.EventEmitter;

    /**
     * Events emitted by run method are:
     * - 'shutdown' When the script process is over. This event is emitted anyway (errors or not)
     */
    Script.prototype.run = function(){

        try{
            global._            = _; // export globals like sails (for models)

            var self            = this;
            this.logger         = require(path.join(process.env.LIB_PATH, 'logger.js'));

            var UserError       = require(path.join(process.env.LIB_PATH, 'user-error.js'));
            var executor        = require(path.join(process.env.LIB_PATH, 'db-exec.js'));
            var configHelper    = require(path.join(process.env.LIB_PATH, 'config-helper.js'));

            this.logger.green('');
            this.logger.green('-------------------------------------');
            this.logger.green('');
            this.logger.green('   -        Db handler        -');
            this.logger.green('   Prepare to destroy the server!');
            this.logger.green('');
            this.logger.green('--------------------------------------');
            this.logger.green('');

            var argv        = require(path.join(process.env.LIB_PATH, 'args.js'));
            var command     = argv._[0];
            var config      = configHelper.load(argv);

            this.logger.green('Here are some information about your current script command:');
            this.logger.green('- command     : %s', command);
            this.logger.green('');
            this.logger.yellow('Script starting..');

            // Prepare the action
            // Will do some stuff depending of the command
            var actionHandler = null;
            switch(command){
                case 'exec':
                    actionHandler = executor(config, path.resolve(process.cwd(), argv.s));
                    break;
                case 'drop':
                    actionHandler = executor(config, path.resolve(__dirname, '../scripts/drop.js'));
                    break;
                case 'init':
                    actionHandler = executor(config, path.resolve(__dirname, '../scripts/init.js'));
                    break;
                default:
                    break;
            }

            // Run the main action
            actionHandler
                .run()
                .then(function(message){
                    self.logger.flash(message);
                    self.logger.flash('Script completed with all the great success you deserve');
                })
                .catch(function(err){
                    if(err instanceof UserError){
                        self.logger.red('An error occured when executing your script, here is the detail:');
                        self.logger.red(err.message);
                    }
                    else{
                        self.logger.red("An internal error occured, here is the stack (yes deal with it!):");
                        self.logger.red(err.stack);
                    }
                })
                .then(function(){
                    self.logger.yellow('Scipt done!');
                    self.emit('shutdown');
                });
        }
        catch(err){

            // Be sure to always emit shutdown even when something uncaught appears.
            this.emit('shutdown');

            throw err;
        }
    };

    module.exports = new Script();

})();