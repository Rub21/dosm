const fs = require('fs');
const cover = require('@mapbox/tile-cover');
const request = require('request-promise');
const turf = require('@turf/turf');
const BlueBirdQueue = require('bluebird-queue');
const config = require('./config')
const merge = require('./merge')
module.exports = function (file, opts) {
  const bound = JSON.parse(fs.readFileSync(file, 'utf8'));
  const limits = {
    min_zoom: opts.zoom,
    max_zoom: opts.zoom
  };
  const q = new BlueBirdQueue({
    concurrency: 5
  });
  const polys = cover.geojson(bound.features[0].geometry, limits);
  for (let i = 0; i < polys.features.length; i++) {
    bbox = turf.bbox(polys.features[i]);
    let url = ''
    if (opts.api === 'osm') {
      url = config[opts.api] + '?bbox=' + bbox.join(',');
    } else if (opts.api === 'overpass') {
      const overpassBbox = `${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]}`
      url = `${config[opts.api]}?data=(node(${overpassBbox});way(${overpassBbox});rel(${overpassBbox}););out meta;`;
    }
    const options = {
      uri: url,
      method: "GET",
      headers: {
        "Content-type": "application/xml"
      }
    };
    q.add(id => {
      return request(options)
        .then(function (body, data) {
          let file = 'file-' + i + '.osm';
          let writeStream = fs.createWriteStream(file, { encoding: 'UTF-8' });
          writeStream.write(body, 'UTF-8');
          writeStream.on('finish', () => {
            console.log('File -> ' + file);
          });
          writeStream.end();
          return file;
        });
    });
  }
  q.start()
    .then(results => {
      merge(results);
      console.log('Total files :' + results.length);
    });
};