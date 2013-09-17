# backer

wip distributed backup / file mirroring tool

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.1.0/dist/gittip.png)](https://www.gittip.com/juliangruber/)

## Idea

Mirror your files between all your computers and servers, so when a harddrive breaks or a computer gets stolen
you don't lose anything.

Like [bittorrent sync](http://labs.bittorrent.com/experiments/sync.html), but open source and in node.js,
so it runs on SmartOS too.

Like [dropbox](https://www.dropbox.com/), but stores your data only on _your_ machines.
No third party - except possibly internet providers - involved.

## Possible features

* revisions
* webgui
* menubar application
* public sharing
* collaborative live editing? maybe just using the file system limits too much

## Data structure

The filesystem is represented as a merkle tree, so **backer** can efficiently figure out what files changed.

## Replication

On connection sync using merkle trees, then maybe use [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
and only send file diffs.

Problem: efficient tree diffing

## Encryption

Since **backer** is only used for transferring data and never stores it on any server/computer but the user's,
only transfor needs to be encrypted.

* Maybe public/private key cryptography?

## Resources

* [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
* [btsync](http://labs.bittorrent.com/experiments/sync/technology.html)
* [dht](http://engineering.bittorrent.com/2013/01/22/bittorrent-tech-talks-dht/)
* [delta encoding](http://en.wikipedia.org/wiki/Delta_encoding)
* [merkle tree](http://en.wikipedia.org/wiki/Merkle_tree)

## Possible dependencies

* [dominictarr/merkle](https://github.com/dominictarr/merkle)

## License

MIT
