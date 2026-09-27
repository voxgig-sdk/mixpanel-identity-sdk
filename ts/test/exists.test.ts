
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelIdentitySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MixpanelIdentitySDK.test()
    equal(testsdk instanceof MixpanelIdentitySDK, true,
      'MixpanelIdentitySDK.test() must return a client synchronously')
  })

})
