const fs = require('fs');
const cover = require('@mapbox/tile-cover');
const request = require('request-promise');
const turf = require('@turf/turf');
const BlueBirdQueue = require('bluebird-queue');
const config = require('./config');
const merge = require('./merge');

module.exports = function(file, zoom) {
  const bound = JSON.parse(fs.readFileSync(file, 'utf8'));
  const limits = {
    min_zoom: zoom,
    max_zoom: zoom
  };
  const q = new BlueBirdQueue({
    concurrency: 10
  });
  const tiles = cover.tiles(bound.features[0].geometry, limits);
  const numBoxes = tiles.length;
  for (let i = 0; i < numBoxes; i++) {
    const tile = tiles[i];
    let url = `${process.env.TMS_URL}/${tile[2]}/${tile[0]}/${tile[1]}.jpg?access_token=${process.env.MBTOKEN}`;
    const options = {
      uri: url,
      method: 'GET',
      encoding: null
    };
    q.add(id => {
      return request(options).then(function(body) {
        let file = 'tile-' + tile.join('-') + '.jpg';
        const writeStream = fs.createWriteStream(file);
        writeStream.write(body);
        writeStream.on('finish', () => {
          console.log(`Downloaded ${i}/${numBoxes}... ${file}`);
        });
        writeStream.end();
        return file;
      });
    });
  }
  q.start().then(results => {
    merge(results);
    console.log('Total files :' + results.length);
  });
};
