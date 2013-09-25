var flat = require('./flat');
var hashFile = require('./hash-file');
var Merkle = require('level-merkle');
var Writable = require('stream').Writable;
var Transform = require('stream').Transform;

module.exports = build;

// Build a merkle tree from everything in `dir`
// and store it in `db`, then call `fn`.
function build(dir, db, fn) {
  var merkle = Merkle(db, 'merkle');

  // This one is ~4x faster but consumes
  // more memory.

  // Store all the file hashes in memory,
  // then write to db in one batch.
  if (true) {
    var ops = [];

    var wr = Writable({ objectMode: true });
    wr._write = function(file, _, done) {
      ops.push({
        key: hashFile(file.path, file.stat),
        value: file.path
      });
      done();
    };

    flat(dir)
    .pipe(wr)
    .on('finish', function() {
      db.batch(ops, fn);
    });
  }

  // This one is slower but consumes less memory,
  // as nothing is buffered

  // Stream files to the db.
  if (false) {
    var tr = Transform({ objectMode: true });
    tr._transform = function(file, _, done) {
      done(null, {
        key: hashFile(file.path, file.stat),
        value: file.path
      });
    };

    flat(dir)
      .pipe(tr)
      .pipe(db.createWriteStream())
      .on('close', fn);
  }

  return merkle;
}

if (!module.parent) {
  var level = require('level');
  var sub = require('level-sublevel');

  level(__dirname + '/../db', function(err, db) {
    db = sub(db);

    var start = Date.now();
    console.log('GO');

    build(__dirname + '/..', db, function(err) {
      if (err) throw err;
      console.log('built merkle tree in %sms', Date.now() - start);
    });
  });
}

