const fs = require('fs');
const cover = require('@mapbox/tile-cover');
const request = require('request-promise');
const BlueBirdQueue = require('bluebird-queue');
const config = require('./config')
module.exports = function (file, folder, zoom) {
  const bound = JSON.parse(fs.readFileSync(file, 'utf8'));
  const limits = {
    min_zoom: 18,
    max_zoom: 18
  };
  const q = new BlueBirdQueue({
    concurrency: 5
  });
  const polys = cover.geojson(bound.features[0].geometry, limits);
  for (let i = 0; i < polys.features.length; i++) { //polys.features.length
    bbox = turf.bbox(polys.features[i]);
    const url = config.osmapi + '?bbox=' + bbox.join(',');
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
          let writeStream = fs.createWriteStream(file);
          writeStream.write(body, 'binary');
          writeStream.on('finish', () => {
            console.log('wrote ' + file);
          });
          writeStream.end();
          return file;
        });
    });
  }
  q.start()
    .then(results => {
      console.log(results);
      console.log('Total files :' + results.length);
    });
};