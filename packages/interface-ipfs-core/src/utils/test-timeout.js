'use strict'

const drain = require('it-drain')

module.exports = (fn) => {
  return new Promise((resolve, reject) => {
    // some operations are either synchronous so cannot time out, or complete during
    // processing of the microtask queue so the timeout timer doesn't fire.  If this
    // is the case this is more of a best-effort test..
    setTimeout(() => {
      const start = Date.now()
      let res = fn()

      if (res[Symbol.asyncIterator]) {
        res = drain(res)
      }

      res.then((result) => {
        const timeTaken = Date.now() - start

        if (timeTaken === 0) {
          return resolve() // too fast!
        }

        reject(new Error(`API call did not time out after ${timeTaken}ms, got ${JSON.stringify(result, null, 2)}`))
      }, (err) => {
        if (err.message.includes('timed out')) {
          return resolve()
        }

        const timeTaken = Date.now() - start

        reject(new Error(`Expected error to include 'timed out' after ${timeTaken}ms, got ${err}`))
      })
    }, 10)
  })
}
