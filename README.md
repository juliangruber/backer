# backer

wip distributed backup / file mirroring tool

## Idea

Mirror your files between all your computers and servers, so when a harddrive breaks or a computer gets stolen
you don't lose anything.

Like [bittorrent sync](http://labs.bittorrent.com/experiments/sync.html), but open source and in node.js,
so it runs on SmartOS too.

Like [dropbox](https://www.dropbox.com/), but stores your data only on _your_ machines.
No third party - except possibly internet providers - involved.

## Road map

* ✘ merkle tree representation of sync folder ([#7](https://github.com/juliangruber/backer/issues/7))
* ✘ diff merkle trees to figure out changed files
* ✘ simple but slow syncing
* ✘ only send diffs for more performance
* ✘ watch files and keep tree up to date
* ✘ replicate tree changes
* ✘ simple responsive web frontend
* ✘ mac os menu bar application
* ✘ installer
* ✘ public facing website

## Associated projects

* [backer-menubar](https://github.com/No9/backer-menubar)
* [backer-frontend](https://github.com/juliangruber/backer-frontend)

## Possible features

* revisions
* public sharing
* relays ([#6](https://github.com/juliangruber/backer/issues/6))

## Data structure

The filesystem is represented as a merkle tree, so **backer** can efficiently figure out what files changed.

## Replication

### On connection

When two or more nodes start replicating (i.e. mirroring, syncing) they need to figure out how
their files differ, so they can exchange only what they really have to.

The most efficient way to do this - as far as I know - is to create a [merkle
tree](http://en.wikipedia.org/wiki/Merkle_tree) (also known as hash tree) representing all
the files and directories in your sync folder.

Since the file system is a tree this is a perfect fit!

When replication is kicked off, both nodes exchange their top hash, the hash of the root node.
If that differs, they start going down the tree (i.e. going deeper into directories) and exchange
hashes until the know which files are different and which are the same.

Then the individual files are diffed and those partial changes are exchanged and applied.

### On further changes

TODO

## Encryption

Since **backer** is only used for transferring data and never stores it on any server/computer but the user's,
only transfor needs to be encrypted.

Encrypting your own harddrive is out of scope and there's plenty of tools that do this,
one popular being [truecrypt](http://www.truecrypt.org/).

* Maybe public/private key cryptography?

## JS api

For maximum composability the transport part of the api will just be a duplex
stream that is to be piped to another **backer**'s duplex stream. This way it
works over tcp, websockets, *in memory*, or over any another network or
streaming interface.

```js
var a = backer(__dirname + '/a').createStream();
var b = backer(__dirname + '/b').createStream();
a.pipe(b).pipe(a);
```

Over tcp it would look like this:

```js
// computer A
var backer = require('backer');

var back = backer(__dirname);
net.createServer(function(con) {
  con.pipe(back.createStream()).pipe(con);
}).listen(PORT);

// computer B
var backer = require('backer');
var reconnect = require('reconnect');

var back = backer(__dirname);
reconnect(function(con) {
  con.pipe(back.createStream()).pipe(con);
}).listen(PORT);
```

There will be events emitted on the **backer** instance, which can then for
example be fed to a web frontend.

## Resources

* [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
* [btsync](http://labs.bittorrent.com/experiments/sync/technology.html)
* [dht](http://engineering.bittorrent.com/2013/01/22/bittorrent-tech-talks-dht/)
* [delta encoding](http://en.wikipedia.org/wiki/Delta_encoding)
* [merkle tree](http://en.wikipedia.org/wiki/Merkle_tree)
* [nodedrop (failed but tried the same)](https://github.com/dominictarr/nodedrop)
* [Build your own private, encrypted, open-source Dropbox-esque sync folder](https://gist.github.com/Tho85/6045429)
* [unison research papers (11)](http://www.cis.upenn.edu/~bcpierce/papers/index.shtml#File%20Synchronization)
* [Direct Connect](http://en.wikipedia.org/wiki/Direct_Connect_(file_sharing))
* [Tree Hash EXchange format (THEX)](http://web.archive.org/web/20080316033726/http://www.open-content.net/specs/draft-jchapweske-thex-02.html)
* [General Verifiable Federation](http://www.waveprotocol.org/whitepapers/wave-protocol-verification)
* [Explain Merkle Trees for use in Eventual Consistency](http://stackoverflow.com/a/5489731)

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
