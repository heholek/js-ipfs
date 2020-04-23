'use strict'

const CID = require('cids')
const parseDuration = require('parse-duration')

module.exports = {
  command: 'resolve <ref>',

  describe: 'fetches a dag node from ipfs, prints its address and remaining path',

  builder: {
    ref: {
      type: 'string'
    },
    timeout: {
      type: 'string',
      coerce: parseDuration
    }
  },

  async handler ({ ctx: { ipfs, print }, ref, timeout }) {
    const options = {
      timeout
    }

    try {
      let lastCid

      for await (const res of ipfs.dag.resolve(ref, options)) {
        if (CID.isCID(res.value)) {
          lastCid = res.value
        }
      }

      if (!lastCid) {
        if (ref.startsWith('/ipfs/')) {
          ref = ref.substring(6)
        }

        lastCid = ref.split('/').shift()
      }

      print(lastCid.toString())
    } catch (err) {
      return print(`dag get resolve: ${err}`)
    }
  }
}
