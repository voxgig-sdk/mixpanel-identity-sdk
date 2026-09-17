-- Typed models for the MixpanelIdentity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Identity
---@field code? number
---@field num_records_imported? number
---@field status? string

---@class IdentityCreateData
---@field project_id? string
---@field strict string
---@field code? number
---@field num_records_imported? number
---@field status? string

local M = {}

return M
