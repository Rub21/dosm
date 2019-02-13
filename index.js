#!/usr/bin/env node
const program = require('commander');
const argv = require('minimist')(process.argv.slice(2));
const download = require('./lib/download');
const downloadTilesByBoundary = require('./lib/downloadTilesByBoundary');
const downloadTilesByTileId = require('./lib/downloadTilesByTileId');

program
  .version('0.0.1')
  .option('-d, --download', 'Download data from overpass')
  .option('-t, --downloadTilesByBoundary', 'Download Tiles by bundary')
  .option('-i, --downloadTilesByTileId', 'Download Tiles by tiles id')

  .parse(process.argv);

const file = process.argv.slice(2)[1];

if (program.download) {
  let opts = {
    api: argv.api,
    zoom: argv.zoom
  };
  download(file, opts);
}

if (program.downloadTilesByBoundary) {
  downloadTilesByBoundary(file, argv.zoom);
}

if (program.downloadTilesByTileId) {
  downloadTilesByTileId(file);
}
