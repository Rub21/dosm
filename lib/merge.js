const exec = require('child-process-promise').exec;
module.exports = function(files) {
  let cmd = ['osmconvert'].concat(files);
  cmd.push('-o=output.osm');
  console.log(cmd.join(' '));
  exec(cmd.join(' '))
    .then(function(result) {
      //remove files
      exec('rm ' + files.join(' '));
    })
    .catch(function(err) {
      console.error(err);
    });
};
