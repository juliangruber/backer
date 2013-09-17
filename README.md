# backer

wip distributed backup / file mirroring tool

## Idea

Like bittorrent sync, but open source and in node.js, so it runs on SmartOS too.

## Data structure

The filesystem is represented as a merkle tree, so **backer** can efficiently figure out what files changed.

## Replication

On connection sync using merkle trees, then maybe use [scuttlebutt](http://www.cs.cornell.edu/home/rvr/papers/flowgossip.pdf)
and only send file diffs.
