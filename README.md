# backer

wip distributed backup / file mirroring tool

## Idea

Like bittorrent sync, but open source and in node.js, so it runs on SmartOS too.

## Possible features

* revisions
* webgui
* public sharing

## Data structure

The filesystem is represented as a merkle tree, so **backer** can efficiently figure out what files changed.

## Replication

On connection sync using merkle trees, then maybe use [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
and only send file diffs.

## Encryption

Since **backer** is only used for transferring data and never stores it on any server/computer but the user's,
only transfor needs to be encrypted.

* Maybe public/private key cryptography?

## Resources

* [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
* [btsync](http://labs.bittorrent.com/experiments/sync/technology.html)
* [dht](http://engineering.bittorrent.com/2013/01/22/bittorrent-tech-talks-dht/)
* [delta encoding](http://en.wikipedia.org/wiki/Delta_encoding)
