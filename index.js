var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = Backer;

function Backer(dir) {
  if (!(this instanceof Backer)) return new Backer(dir);
  EventEmitter.call(this);

  this.dir = dir;
}

inherits(Backer, EventEmitter);

Backer.prototype.createStream() {
  throw new Error('not yet implemented');
};

