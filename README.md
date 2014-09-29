# Readme

This document contain all basic stuff about installing and running application. For more complete information please visit redh00d team website at 
https://sites.google.com/site/redh00dintern/API.

This application is a RESTFUL web service which provide bridge between customer application and data. The entire code is under Node.js

## Prerequisites for correct running application:
- Install node.js.
- Install forever globally `npm install -g forever`.
- Install node-gyp globally `npm install -g node-gyp` (read doc for installation).
- Move terminal inside project dir and run `npm update`.
- Run `forever -c node app.js --dev` for a development instance.
- Or run `forever -c node app.js --prod` for a production instance.
- Or (on windows) use the two batch scripts available in project dir.
- Or use sails.js starter. Then you need to install sails.js `npm install -g sails` and run `sails lift` inside project dir.
- Or run the app.js by yourself if you are smart enough :) `node app.js`.
- You will probably need to visit the home page with the browser to accept easily the first time the certificate. Visit https://localhost:1337/.

## Prerequisites for correct application development:
- All prerequisites for running application.
- Install mocha globally: `npm install -g mocha`.

## Run test:
- Run `mocha` in terminal.

## (re)Generate documentation:
- Run `node api-docs/run-generation.js` in terminal.

## Troubleshooting:
- Install of `node-gyp` fail: Please verify all requirements for the installation. Check official website page.
- Install of `bcryt` fail on Windows: check these issues (http://goo.gl/v9APnG)

## FAQ (Any questions that are not written above):
