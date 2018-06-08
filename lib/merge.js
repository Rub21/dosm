const exec = require('child-process-promise').exec;
module.exports  = function(files){
    let cmd = ['osmconvert'].concat(files)
    cmd.push('-o=output.osm');
    console.log(cmd.join(' '));
    exec(cmd.join(' '))
    .then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    })
    .catch(function (err) {
        console.error(err);
    });
}

