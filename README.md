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

## Associated projects

* [backer-menubar](https://github.com/No9/backer-menubar)

## Possible features

* revisions
* webgui
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

Encrypting your own harddrive is out of scope and there's plenty of tools that do this,
one popular being [truecrypt](http://www.truecrypt.org/).

* Maybe public/private key cryptography?

## Resources

* [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
* [btsync](http://labs.bittorrent.com/experiments/sync/technology.html)
* [dht](http://engineering.bittorrent.com/2013/01/22/bittorrent-tech-talks-dht/)
* [delta encoding](http://en.wikipedia.org/wiki/Delta_encoding)
* [merkle tree](http://en.wikipedia.org/wiki/Merkle_tree)
* [nodedrop (failed but tried the same)](https://github.com/dominictarr/nodedrop)
* [Build your own private, encrypted, open-source Dropbox-esque sync folder](https://gist.github.com/Tho85/6045429)
* [unison research papers (11)](http://www.cis.upenn.edu/~bcpierce/papers/index.shtml#File%20Synchronization)

## Possible dependencies

* [dominictarr/merkle](https://github.com/dominictarr/merkle)
* [roderwang/node-webkit](https://github.com/rogerwang/node-webkit/wiki/Tray)
  * [shama/nodewebkit](https://github.com/shama/nodewebkit) (npm installer)

## Collaborators

* [maxogden](https://github.com/maxogden)
* [hughsk](https://github.com/hughsk)
* [dominictarr](https://github.com/dominictarr)
* [rvagg](https://github.com/rvagg)
* [StarBurst1977](https://github.com/StarBurst1977)
* [joelcipriano](https://github.com/joelcipriano)
* [silvinci](https://github.com/silvinci)
* [minuteman3](https://github.com/minuteman3)
* you?

There's a lot still to be figured out, so if you either _are_ a mad scientist that juggles chainsaws while writing
distributed systems, or want to be _come one_, this is the right place for you!

Plus, there's going to be need for designs, blog posts, a public facing website, etc.!

## License

MIT
