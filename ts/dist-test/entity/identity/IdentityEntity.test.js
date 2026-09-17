"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('IdentityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_IDENTITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_IDENTITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelIdentitySDK.test();
        const ent = testsdk.Identity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_IDENTITY_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'identity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "code", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "num_records_imported", "req": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 2 }], "name": "identity", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "project_id", "orig": "project_id", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "1", "kind": "query", "name": "strict", "orig": "strict", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "POST /import", "json": "{\"operationId\":\"identity-merge\",\"parameters\":[{\"description\":\"When set to 1 (recommended), Mixpanel will validate the batch and return errors per event that failed.\",\"in\":\"query\",\"name\":\"strict\",\"required\":true,\"schema\":{\"default\":\"1\",\"enum\":[\"0\",\"1\"],\"type\":\"string\"}},{\"description\":\"The Mixpanel project_id, used to authenticate service account credentials (do not provide if using secret auth).\",\"in\":\"query\",\"name\":\"project_id\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"event\":{\"default\":\"$merge\",\"description\":\"This is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.\",\"title\":\"event\",\"type\":\"string\"},\"properties\":{\"properties\":{\"$distinct_ids\":{\"description\":\"The two distinct_ids to merge together.\",\"items\":{\"type\":\"string\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"}},\"required\":[\"$distinct_ids\",\"token\"],\"title\":\"properties\",\"type\":\"object\"}},\"required\":[\"event\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"code\":200,\"num_records_imported\":2000,\"status\":\"OK\"},\"properties\":{\"code\":{\"type\":\"integer\"},\"num_records_imported\":{\"type\":\"integer\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A 200 response indicates all events were successfully ingested.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"code\":400,\"failed_records\":[{\"field\":\"properties.time\",\"index\":0,\"insert_id\":\"13c0b661-f48b-51cd-ba54-97c5999169c0\",\"message\":\"'properties.time' is invalid: must be specified as seconds since epoch\"}],\"num_records_imported\":999,\"status\":\"Bad Request\"},\"properties\":{\"code\":{\"type\":\"integer\"},\"error\":{\"type\":\"string\"},\"failed_records\":{\"items\":{\"properties\":{\"field\":{\"type\":\"string\"},\"index\":{\"type\":\"number\"},\"insert_id\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"num_records_imported\":{\"type\":\"integer\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A 400 response indicates that some events failed validation.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"code\":401,\"error\":\"Invalid service account credentials\",\"status\":\"Unauthorized\"},\"properties\":{\"code\":{\"type\":\"integer\"},\"error\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A 401 response indicates invalid service account credentials.\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]},{\"OAuthToken\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/import", "segments": [{ "lit": "import" }], "select": { "exist": ["project_id", "strict"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "POST /track#create-identity", "json": "{\"operationId\":\"create-identity\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"allOf\":[{\"properties\":{\"data\":{\"default\":\"{\\n      \\\"event\\\": \\\"$identify\\\",\\n      \\\"properties\\\": {\\n          \\\"$identified_id\\\": \\\"ORIGINAL_ID\\\",\\n          \\\"$anon_id\\\": \\\"NEW_ID\\\",\\n          \\\"token\\\": \\\"YOUR_PROJECT_TOKEN\\\"\\n      }\\n}\\n\",\"description\":\"A JSON object with the required Event Object fields and any additional event properties.\",\"format\":\"blob\",\"type\":\"string\"}},\"required\":[\"data\"],\"type\":\"object\"},{\"allOf\":[{\"properties\":{\"strict\":{\"allOf\":[{\"maximum\":1,\"minimum\":0,\"type\":\"integer\"},{\"description\":\"If present and equal to 1, Mixpanel will validate the provided records and return a JSON object with per-record error messages for records that fail validation.\"}]}},\"type\":\"object\"}]}]}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"examples\":{\"Invalid Data\":{\"value\":0},\"Valid Data\":{\"value\":1}},\"schema\":{\"enum\":[1,0],\"type\":\"integer\"}}},\"description\":\"\\n* `1` - All data objects provided are valid. This does not signify a valid project token or secret.\\n* `0` - One or more data objects in the body are invalid.\\n\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/track#create-identity", "segments": [{ "lit": "track#create-identity" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": {}, "contract": { "id": "POST /track#identity-create-alias", "json": "{\"operationId\":\"identity-create-alias\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"allOf\":[{\"properties\":{\"data\":{\"default\":\"{\\n    \\\"event\\\": \\\"$create_alias\\\",\\n    \\\"properties\\\": {\\n        \\\"distinct_id\\\": \\\"other_distinct_id\\\",\\n        \\\"alias\\\": \\\"your_id\\\",\\n        \\\"token\\\": \\\"YOUR_PROJECT_TOKEN\\\"\\n    }\\n}\\n\",\"description\":\"A JSON object with the required Event Object fields and any additional event properties.\",\"format\":\"blob\",\"type\":\"string\"}},\"required\":[\"data\"],\"type\":\"object\"},{\"allOf\":[{\"properties\":{\"strict\":{\"allOf\":[{\"maximum\":1,\"minimum\":0,\"type\":\"integer\"},{\"description\":\"If present and equal to 1, Mixpanel will validate the provided records and return a JSON object with per-record error messages for records that fail validation.\"}]}},\"type\":\"object\"}]}]}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"examples\":{\"Invalid Data\":{\"value\":0},\"Valid Data\":{\"value\":1}},\"schema\":{\"enum\":[1,0],\"type\":\"integer\"}}},\"description\":\"\\n* `1` - All data objects provided are valid. This does not signify a valid project token or secret.\\n* `0` - One or more data objects in the body are invalid.\\n\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/track#identity-create-alias", "segments": [{ "lit": "track#identity-create-alias" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "identity", "name__orig": "identity", "Name": "Identity", "name_": "identity", "name-": "identity", "NAME": "IDENTITY", "index$": 0 }, { "active": true, "entity": "identity", "key$": "BasicIdentityFlow", "kind": "basic", "name": "BasicIdentityFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "identity_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Identity');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const identity_ref01_ent = client.Identity();
        let identity_ref01_data = setup.data.new.identity['identity_ref01'];
        identity_ref01_data = (await identity_ref01_ent.create(identity_ref01_data)).data();
        (0, node_assert_1.default)(null != identity_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/identity/IdentityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelIdentitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['identity01', 'identity02', 'identity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID': idmap,
        'MIXPANEL_IDENTITY_TEST_LIVE': 'FALSE',
        'MIXPANEL_IDENTITY_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_IDENTITY_APIKEY': '',
        'MIXPANEL_IDENTITY_SECRET': '',
        'MIXPANEL_IDENTITY_SERVER_REGION': "api",
    });
    idmap = env['MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_IDENTITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_IDENTITY_TEST_IDENTITY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelIdentitySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=IdentityEntity.test.js.map