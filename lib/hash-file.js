var crypto = require('crypto');
var fs = require('fs');
var once = require('once');

module.exports = hashFile;

// The mechanism used to hash a file.
// For now let's hash
//
//   H(mtime + filesize)
//
// If that breaks we can resort to hashing
//
//   H(filecontent)
//
// Hex digests are easier to debug but bigger
// than binary blobs, so we'll use them for
// now and switch later.
function hashFile(path, cb) {
  var hash = crypto.createHash('sha1');

  fs.stat(path, function(err, stat) {
    if (err) return cb(err);
    hash.update(stat.mtime.getTime() + '');
    hash.update(stat.size + '');
    cb(null, hash.digest('hex'));
  });
}

function alternative(path, cb) {
  cb = once(cb);
  var hash = crypto.createHash('sha1');

  fs.createReadStream(path)
    .on('data', function(chunk) {
      hash.update(chunk);
    })
    .on('end', function() {
      cb(null, hash.digest('hex'));
    })
    .on('error', cb);
}

if (!module.parent) {
  hashFile(__dirname + '/hash-file.js', console.log.bind(console, 'hashFile'));
  alternative(__dirname + '/hash-file.js', console.log.bind(console, 'alternative'));
}

