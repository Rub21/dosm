#!/usr/bin/env node
var program = require('commander');
var download = require('./lib/download');
program
  .version('0.0.1')
  .option('-d, --download', 'Download data from overpass')
  .parse(process.argv);

var file = process.argv.slice(2)[1];

if (program.download) {
  download(file);
}
