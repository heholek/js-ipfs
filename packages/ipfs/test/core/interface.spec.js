/* eslint-env mocha, browser */
'use strict'

const tests = require('interface-ipfs-core')
const { isNode } = require('ipfs-utils/src/env')
const factory = require('../utils/factory')

/** @typedef { import("ipfsd-ctl").ControllerOptions } ControllerOptions */

describe('interface-ipfs-core tests', function () {
  const commonFactory = factory()
  /*
  tests.root(commonFactory, {
    skip: isNode ? [] : [{
      name: 'should add with mtime as hrtime',
      reason: 'Not designed to run in the browser'
    }]
  })

  tests.bitswap(commonFactory, {
    skip: [{
      name: 'should respect timeout option when getting bitswap stats',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting bitswap wantlist',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.block(commonFactory)

  tests.bootstrap(commonFactory, {
    skip: [{
      name: 'should respect timeout option listing bootstrap nodes',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.config(commonFactory, {
    skip: [{
      name: 'should respect timeout option when listing config profiles',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting config values',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.dag(commonFactory)

  tests.dht(commonFactory, {
    skip: {
      reason: 'TODO: unskip when DHT is enabled: https://github.com/ipfs/js-ipfs/pull/1994'
    }
  })

  tests.files(factory({
    ipfsOptions: { EXPERIMENTAL: { sharding: true } }
  }), {
    skip: true || isNode ? null : [{
      name: 'should make directory and specify mtime as hrtime',
      reason: 'Not designed to run in the browser'
    }, {
      name: 'should set mtime as hrtime',
      reason: 'Not designed to run in the browser'
    }, {
      name: 'should write file and specify mtime as hrtime',
      reason: 'Not designed to run in the browser'
    }]
  })
*/
  tests.key(commonFactory)

  tests.miscellaneous(commonFactory, {
    skip: [{
      name: 'should respect timeout option when getting the node id',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting the node version',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.name(factory({
    ipfsOptions: {
      offline: true
    }
  }), {
    name: 'should respect timeout option when resolving an IPNS name',
    reason: 'is synchronous or does all work in the microtask queue so cannot time out'
  })

  tests.namePubsub(factory({
    ipfsOptions: {
      EXPERIMENTAL: {
        ipnsPubsub: true
      }
    }
  }), {
    skip: [{
      name: 'should respect timeout option when cancelling an IPNS pubsub subscription',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting IPNS pubsub subscriptions',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting the IPNS pubsub state',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.object(commonFactory, {
    skip: [{
      name: 'should respect timeout option when creating a new object',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.pin(commonFactory)

  tests.ping(commonFactory)

  tests.pubsub(factory({}, {
    go: {
      args: ['--enable-pubsub-experiment']
    }
  }), {
    skip: [
      ...(isNode ? [] : [
        {
          name: 'should receive messages from a different node',
          reason: 'https://github.com/ipfs/js-ipfs/issues/2662'
        },
        {
          name: 'should round trip a non-utf8 binary buffer',
          reason: 'https://github.com/ipfs/js-ipfs/issues/2662'
        },
        {
          name: 'should receive multiple messages',
          reason: 'https://github.com/ipfs/js-ipfs/issues/2662'
        },
        {
          name: 'should send/receive 100 messages',
          reason: 'https://github.com/ipfs/js-ipfs/issues/2662'
        }]), {
        name: 'should respect timeout option when subscribing to a pubsub topic',
        reason: 'is synchronous or does all work in the microtask queue so cannot time out'
      }, {
        name: 'should respect timeout option when listing pubsub peers',
        reason: 'is synchronous or does all work in the microtask queue so cannot time out'
      }, {
        name: 'should respect timeout option when listing pubsub subscriptions',
        reason: 'is synchronous or does all work in the microtask queue so cannot time out'
      }
    ]
  })

  tests.repo(commonFactory, {
    skip: [{
      name: 'should respect timeout option when getting the repo version',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.stats(commonFactory, {
    skip: [{
      name: 'should respect timeout option when getting bitswap stats',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when getting bandwith stats',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })

  tests.swarm(commonFactory, {
    skip: [{
      name: 'should respect timeout option when listing swarm peers',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when listing swarm addresses',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }, {
      name: 'should respect timeout option when disconnecting from a remote peer',
      reason: 'is synchronous or does all work in the microtask queue so cannot time out'
    }]
  })
})
