# Readme

[![Build Status](https://magnum.travis-ci.com/mbret/redh00d-ws.svg?token=Mjz2n6ks7X1yu16DThti&branch=develop)](https://magnum.travis-ci.com/mbret/redh00d-ws)
[![Join the chat at https://gitter.im/mbret/redh00d](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mbret/redh00d)


This document contain all basic stuff about installing and running application. For more complete information please visit redh00d team website at 
https://sites.google.com/site/redh00dintern/API.

This application is a RESTFUL web service which provide bridge between customer application and data. The entire code is under Node.js

## Prerequisites for correct running application:
- Install node.js. (You need at least v4.0)
- Run `npm install sails -g`.
- Inside project root dir, run `npm install`.

## Prerequisites for correct application development:
- All prerequisites for running application.
- Install mocha globally: `npm install -g mocha`.

## Execute REST request
This api is only supposed to be acceded via REST request. The homepage is only here to help development so make request by yourself.
To use the api you can use many tools (Chrome console, Postman, etc) but also programming languages. In fact you will probably use Java or Objective C to make request.
- If you use programming language do refer to the specific api to use it.
- If you use a specific tool like Postman it should be clear enough, no more help needed.

## Start application
- Run `npm start`
- You will probably need to visit the home page with the browser to accept easily the first time the certificate. Visit https://localhost:1337/.
- You can try to visit /api/dev/db (in development runtime) to check if you get any response.

## Test application:
- Run `npm test`

## (re)Generate documentation:
- Run `node api-docs/run-generation.js` in terminal.

## Deploy on server:
Server run user for node is www-data over pm2. www-data must have right to write to correct folders.
- Never upload .tmp, data, node_modules or read below
- Make sure .tmp, data is owned by group www-data and has 664 chmod
- The pm2 process should watch your change and restart app. Check online.

## Troubleshooting:
- Could not get any response with request manager application like postman or inside phone application: Be sure you have allowed certificate of application. It can be done by visiting first time the home page ex: https://localhost:1337.

## FAQ (Any questions that are not written above):
