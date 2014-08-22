var childProcess = require('child_process');
var fs = require('fs')
var script = 'apidoc -i ./sources -o "./generated-doc"';
var fileToFix = 'generated-doc/main.js';

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.exec(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript( script , function (err) {
    if (err) throw err;
    console.log('finished running apidoc');

    // Fix the waitSeconds: 1 to 0 inside generated doc
    fs.readFile( fileToFix, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/waitSeconds: 1/g, 'waitSeconds: 0');

        fs.writeFile( fileToFix, result, 'utf8', function (err) {
            if (err) throw err;
            console.log('finished fixing generated doc');
        });
    });
});

