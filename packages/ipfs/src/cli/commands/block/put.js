'use strict'

const fs = require('fs')
const multibase = require('multibase')
const concat = require('it-concat')
const { cidToString } = require('../../../utils/cid')
const parseDuration = require('parse-duration')

module.exports = {
  command: 'put [block]',

  describe: 'Stores input as an IPFS block',

  builder: {
    format: {
      alias: 'f',
      describe: 'cid format for blocks to be created with.',
      default: 'dag-pb'
    },
    mhtype: {
      describe: 'multihash hash function',
      default: 'sha2-256'
    },
    mhlen: {
      describe: 'multihash hash length',
      default: undefined
    },
    version: {
      describe: 'cid version',
      type: 'number',
      default: 0
    },
    'cid-base': {
      describe: 'Number base to display CIDs in.',
      type: 'string',
      choices: multibase.names
    },
    timeout: {
      type: 'string',
      coerce: parseDuration
    }
  },

  async handler ({ ctx: { ipfs, print, getStdin }, block, timeout, format, mhtype, mhlen, version, cidBase }) {
    let data

    if (block) {
      data = fs.readFileSync(block)
    } else {
      data = (await concat(getStdin())).slice()
    }

    const { cid } = await ipfs.block.put(data, {
      timeout,
      format,
      mhtype,
      mhlen,
      version
    })
    print(cidToString(cid, { base: cidBase }))
  }
}
