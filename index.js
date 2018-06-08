#!/usr/bin/env node
const program = require('commander');
const argv = require('minimist')(process.argv.slice(2));
const download = require('./lib/download');
program
  .version('0.0.1')
  .option('-d, --download', 'Download data from overpass')
  .parse(process.argv);

const file = process.argv.slice(2)[1];

if (program.download) {
  let opts = {
    api: argv.api,
    zoom: argv.zoom
  }
  download(file, opts);
}
