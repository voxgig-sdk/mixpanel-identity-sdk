
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelIdentitySDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelIdentitySDK.test()
    equal(null !== testsdk, true)
  })

})
