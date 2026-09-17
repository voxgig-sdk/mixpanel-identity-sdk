<?php
declare(strict_types=1);

// Typed models for the MixpanelIdentity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Identity entity data model. */
class Identity
{
    public ?int $code = null;
    public ?int $num_records_imported = null;
    public ?string $status = null;
}

/** Request payload for Identity#create. */
class IdentityCreateData
{
    public ?string $project_id = null;
    public string $strict;
    public ?int $code = null;
    public ?int $num_records_imported = null;
    public ?string $status = null;
}

