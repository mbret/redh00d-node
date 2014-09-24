# Readme

## Prerequisites for correct running application:
- install node.js

## Prerequisites for correct application development:
- All prerequisites for running application
- install mocha globally: `npm install -g mocha`

## First init of application:
- `npm install`

## Run test:
- `mocha`

## Run application for development:
- node app.js // run one time
- `_run-forever-development` // forever running (batch script)

## Run application for production:
- node app.js --prod // run one time
- `_run-forever-production` // forever running (batch script)

## (re)Generate documentation:
- node api-docs/run-generation.js