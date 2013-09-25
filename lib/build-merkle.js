var flat = require('./flat');
var hashFile = require('./hash-file');
var Merkle = require('level-merkle');
var Transform = require('stream').Transform;

module.exports = build;

// Build a merkle tree from everything in `dir`
// and store it in `db`, then call `fn`.
function build(dir, db, fn) {
  var merkle = Merkle(db, 'merkle');

  var ops = [];

  // Store all the file hashes in memory,
  // then write to db in one batch.
  flat(dir)
  .pipe(hashStream())
  .on('data', function(op) {
    ops.push(op);
  })
  .on('end', function() {
    db.batch(ops, fn)
  });

  // That would be the nice solution but
  // unfortunately is way too slow.
  if (false) {
    flat(dir)
      .pipe(hashStream())
      .pipe(db.createWriteStream())
      .on('close', fn);
  }
}

// A transform stream that hashes files and
// outputs db operations.
function hashStream() {
  var tr = Transform({ objectMode: true });
  tr._transform = function(filename, _, done) {
    hashFile(filename, function(err, hash) {
      done(err, !err && {
        key: hash,
        value: filename
      });
    });
  };
  return tr;
}

if (!module.parent) {
  var level = require('level');
  var sub = require('level-sublevel');
  var db = sub(level(__dirname + '/../db'));

  var start = Date.now();
  console.log('GO');

  build(__dirname + '/../..', db, function(err) {
    if (err) throw err;
    console.log('built merkle tree in %sms', Date.now() - start);
  });
}
