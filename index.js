var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var merkle = require('./lib/build-merkle');
var level = require('level');
var sub = require('level-sublevel');
var join = require('path').join;

module.exports = Backer;

function Backer(dir) {
  if (!(this instanceof Backer)) return new Backer(dir);
  EventEmitter.call(this);

  this.dir = dir;
  this.db = sub(level(join(dir, '/.backer')));
}

inherits(Backer, EventEmitter);

Backer.prototype.createStream = function() {
  var m = merkle(this.dir, this.db, function(err) {
    if (err) throw err;
  });

  var s = m.createStream();
  return s;
};

if (!module.parent) {
  var a = Backer(__dirname + '/example/a');
  var b = Backer(__dirname + '/example/b');

  var as = a.createStream();
  var bs = b.createStream();

  as.on('sync', function() {
    console.log('as sync');
  });

  bs.on('sync', function() {
    console.log('bs sync');
  });

  as.pipe(bs).pipe(as);
}
