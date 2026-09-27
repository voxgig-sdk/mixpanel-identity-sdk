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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "code": { "a": true, "h": "Code", "n": "code", "r": false, "t": "`$INTEGER`", "key$": "code", "index$": 0 }, "num_records_imported": { "a": true, "h": "Num Records Imported", "n": "num_records_imported", "r": false, "t": "`$INTEGER`", "key$": "num_records_imported", "index$": 1 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 2 } }, "name": "identity", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /import", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "1", "k": "query", "n": "strict", "or": "strict", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/import", "q": { "exist": ["project_id", "strict"] }, "r": {}, "s": [{ "lit": "import" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /track#create-identity", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/track#create-identity", "q": {}, "r": {}, "s": [{ "lit": "track#create-identity" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /track#identity-create-alias", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/track#identity-create-alias", "q": {}, "r": {}, "s": [{ "lit": "track#identity-create-alias" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "identity", "name__orig": "identity", "Name": "Identity", "name_": "identity", "name-": "identity", "NAME": "IDENTITY", "index$": 0 }, { "active": true, "entity": "identity", "key$": "BasicIdentityFlow", "kind": "basic", "name": "BasicIdentityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "identity_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Identity', { "POST /import": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "required": ["event", "properties"], "properties": { "event": { "type": "string", "title": "event", "description": "This is the name of the event. If you're loading data from a data warehouse, we recommend using the name of the table as the name of the event.", "default": "$merge" }, "properties": { "type": "object", "title": "properties", "required": ["$distinct_ids", "token"], "properties": { "$distinct_ids": { "type": "array", "minItems": 2, "maxItems": 2, "items": {}, "description": "The two distinct_ids to merge together." } } } } }, "index$": 1 } } } }, "parameters": [{ "in": "query", "name": "strict", "required": true, "schema": { "type": "string", "default": "1", "enum": ["0", "1"] }, "description": "When set to 1 (recommended), Mixpanel will validate the batch and return errors per event that failed.", "index$": 0 }, { "in": "query", "name": "project_id", "required": false, "schema": { "type": "string" }, "description": "The Mixpanel project_id, used to authenticate service account credentials (do not provide if using secret auth).", "index$": 1 }] }, "POST /track#create-identity": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "allOf": [{ "type": "object", "required": ["data"], "properties": { "data": { "type": "string", "format": "blob", "description": "A JSON object with the required Event Object fields and any additional event properties.", "default": "{\n      \"event\": \"$identify\",\n      \"properties\": {\n          \"$identified_id\": \"ORIGINAL_ID\",\n          \"$anon_id\": \"NEW_ID\",\n          \"token\": \"YOUR_PROJECT_TOKEN\"\n      }\n}\n" } } }, { "allOf": [{ "type": "object", "properties": { "strict": {} } }], "x-ref": "#/components/schemas/ImportRequestParameters" }] } } } }, "parameters": [] }, "POST /track#identity-create-alias": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "allOf": [{ "type": "object", "required": ["data"], "properties": { "data": { "type": "string", "format": "blob", "description": "A JSON object with the required Event Object fields and any additional event properties.", "default": "{\n    \"event\": \"$create_alias\",\n    \"properties\": {\n        \"distinct_id\": \"other_distinct_id\",\n        \"alias\": \"your_id\",\n        \"token\": \"YOUR_PROJECT_TOKEN\"\n    }\n}\n" } } }, { "allOf": [{ "type": "object", "properties": { "strict": {} } }], "x-ref": "#/components/schemas/ImportRequestParameters" }] } } } }, "parameters": [] } });
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