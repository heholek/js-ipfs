/* eslint-env mocha */
'use strict'

const { getDescribe, getIt, expect } = require('../utils/mocha')
const testTimeout = require('../utils/test-timeout')

/** @typedef { import("ipfsd-ctl/src/factory") } Factory */
/**
 * @param {Factory} common
 * @param {Object} options
 */
module.exports = (common, options) => {
  const describe = getDescribe(options)
  const it = getIt(options)

  describe('.stop', function () {
    this.timeout(60 * 1000)
    let ipfs

    beforeEach(async () => {
      ipfs = await common.spawn()
    })

    it('should respect timeout option when stopping the node', async () => {
      return testTimeout(() => ipfs.api.stop({
        timeout: 1
      }))
    })

    it('should stop the node', async () => {
      // Should succeed because node is started
      await ipfs.api.swarm.peers()

      // Stop the node and try the call again
      await ipfs.api.stop()

      // Trying to use an API that requires a started node should return an error
      return expect(ipfs.api.swarm.peers()).to.eventually.be.rejected()
    })
  })
}
