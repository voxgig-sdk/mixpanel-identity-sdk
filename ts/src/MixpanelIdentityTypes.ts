// Typed models for the MixpanelIdentity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Identity {
  code?: number
  num_records_imported?: number
  status?: string
}

export interface IdentityCreateData {
  project_id?: string
  strict: string
  code?: number
  num_records_imported?: number
  status?: string
}

