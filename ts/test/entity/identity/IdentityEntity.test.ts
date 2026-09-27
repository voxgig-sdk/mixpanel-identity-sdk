

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelIdentitySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('IdentityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_IDENTITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_IDENTITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelIdentitySDK.test()
    const ent = testsdk.Identity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_IDENTITY_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'identity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"t":"`$INTEGER`","key$":"code","index$":0},"num_records_imported":{"a":true,"h":"Num Records Imported","n":"num_records_imported","r":false,"t":"`$INTEGER`","key$":"num_records_imported","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":2}},"name":"identity","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /import","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"project_id","or":"project_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"1","k":"query","n":"strict","or":"strict","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/import","q":{"exist":["project_id","strict"]},"r":{},"s":[{"lit":"import"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /track#create-identity","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/track#create-identity","q":{},"r":{},"s":[{"lit":"track#create-identity"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /track#identity-create-alias","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/track#identity-create-alias","q":{},"r":{},"s":[{"lit":"track#identity-create-alias"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"identity","name__orig":"identity","Name":"Identity","name_":"identity","name-":"identity","NAME":"IDENTITY","index$":0}, {"active":true,"entity":"identity","key$":"BasicIdentityFlow","kind":"basic","name":"BasicIdentityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"identity_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Identity', {"POST /import":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"array","items":{"type":"object","required":["event","properties"],"properties":{"event":{"type":"string","title":"event","description":"This is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.","default":"$merge"},"properties":{"type":"object","title":"properties","required":["$distinct_ids","token"],"properties":{"$distinct_ids":{"type":"array","minItems":2,"maxItems":2,"items":{},"description":"The two distinct_ids to merge together."}}}}},"index$":1}}}},"parameters":[{"in":"query","name":"strict","required":true,"schema":{"type":"string","default":"1","enum":["0","1"]},"description":"When set to 1 (recommended), Mixpanel will validate the batch and return errors per event that failed.","index$":0},{"in":"query","name":"project_id","required":false,"schema":{"type":"string"},"description":"The Mixpanel project_id, used to authenticate service account credentials (do not provide if using secret auth).","index$":1}]},"POST /track#create-identity":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"allOf":[{"type":"object","required":["data"],"properties":{"data":{"type":"string","format":"blob","description":"A JSON object with the required Event Object fields and any additional event properties.","default":"{\n      \"event\": \"$identify\",\n      \"properties\": {\n          \"$identified_id\": \"ORIGINAL_ID\",\n          \"$anon_id\": \"NEW_ID\",\n          \"token\": \"YOUR_PROJECT_TOKEN\"\n      }\n}\n"}}},{"allOf":[{"type":"object","properties":{"strict":{}}}],"x-ref":"#/components/schemas/ImportRequestParameters"}]}}}},"parameters":[]},"POST /track#identity-create-alias":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"allOf":[{"type":"object","required":["data"],"properties":{"data":{"type":"string","format":"blob","description":"A JSON object with the required Event Object fields and any additional event properties.","default":"{\n    \"event\": \"$create_alias\",\n    \"properties\": {\n        \"distinct_id\": \"other_distinct_id\",\n        \"alias\": \"your_id\",\n        \"token\": \"YOUR_PROJECT_TOKEN\"\n    }\n}\n"}}},{"allOf":[{"type":"object","properties":{"strict":{}}}],"x-ref":"#/components/schemas/ImportRequestParameters"}]}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const identity_ref01_ent = client.Identity()
    let identity_ref01_data = setup.data.new.identity['identity_ref01']

    identity_ref01_data = (await identity_ref01_ent.create(identity_ref01_data)).data()
    assert(null != identity_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/identity/IdentityTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelIdentitySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['identity01','identity02','identity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID': idmap,
    'MIXPANEL_IDENTITY_TEST_LIVE': 'FALSE',
    'MIXPANEL_IDENTITY_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_IDENTITY_APIKEY': '',
    'MIXPANEL_IDENTITY_SECRET': '',
    'MIXPANEL_IDENTITY_SERVER_REGION': "api",
  })

  idmap = env['MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID']

  const live = 'TRUE' === env.MIXPANEL_IDENTITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelIdentitySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_IDENTITY_APIKEY,
        secret: env.MIXPANEL_IDENTITY_SECRET,
        server: {
          region: env.MIXPANEL_IDENTITY_SERVER_REGION,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_IDENTITY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
