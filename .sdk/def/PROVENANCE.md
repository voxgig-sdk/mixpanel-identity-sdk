# API definition provenance

## mixpanel-identity-openapi.yaml

- **Source:** https://raw.githubusercontent.com/mixpanel/docs/main/openapi/identity.openapi.yaml
- **Publisher:** Mixpanel (mixpanel/docs, the repository Mixpanel publishes its API docs from)
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.0.2 (YAML)
- **Size:** 9430 bytes
- **Coverage:** 3 paths — the whole Mixpanel Identity API as published.

Unmodified vendor file. Do not hand-edit it: refresh it from the source URL
above and re-record the retrieval date.

## Why this is its own SDK

Mixpanel publishes **thirteen** separate OpenAPI documents, one per API:
Annotations, Data Pipelines, Experiments, Event Export, Feature Flags, Feature
Flags Management, GDPR, Identity, Ingestion, Lexicon Schemas, Query, Service
Accounts and Warehouse Connectors. They are separate API surfaces on separate
hosts, so each is its own SDK rather than one client claiming "the Mixpanel
API".
