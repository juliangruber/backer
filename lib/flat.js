var fs = require('fs');
var Readable = require('stream').Readable;
var join = require('path').join;
var resolve = require('path').resolve;

module.exports = flat;

// A readable stream that emits all the files
// in a directory tree in alphabetical order,
// used for creating the initial merkle tree

function flat(dir) {
  var rs = Readable({ objectMode: true });
  var todo = [dir];
  var handling = false;

  function next() {
    // Limit concurrency to 1
    // so we don't have to buffer anything.
    // Trade off memory vs speed, maybe the other
    // way around is better.
    if (handling) return;

    var file = todo.shift();
    if (!file) return rs.push(null);

    handling = true;
    fs.stat(file, function(err, stat) {
      handling = false;
      if (err) {
        if (err.code == 'ENOENT') {
          // This is a broken link
          next();
        } else {
          rs.emit('error', err);
        }
        return;
      }

      if (stat.isFile()) {
        if (rs.push({
          path: file,
          stat: stat
        })) next();
        return;
      }

      if (stat.isDirectory()) {
        fs.readdir(file, function(err, files) {
          if (err) return rs.emit('error', err);

          todo = files
            .filter(function(f) {
              return !/\.backer$/.test(f);
            })
            .map(function(f) {
              return join(resolve(file), f);
            })
            .concat(todo);

          next();
        });
      }
    });
  }

  rs._read = next;
  return rs;
}

if (!module.parent) {
  flat(process.argv[2] || __dirname + '/..')
    .on('data', console.log)
    .on('end', console.log.bind(console, 'done'));
}

