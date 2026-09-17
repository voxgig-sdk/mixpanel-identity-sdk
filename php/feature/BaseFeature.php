<?php
declare(strict_types=1);

// MixpanelIdentity SDK base feature

class MixpanelIdentityBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelIdentityContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelIdentityContext $ctx): void {}
    public function PostConstructEntity(MixpanelIdentityContext $ctx): void {}
    public function SetData(MixpanelIdentityContext $ctx): void {}
    public function GetData(MixpanelIdentityContext $ctx): void {}
    public function GetMatch(MixpanelIdentityContext $ctx): void {}
    public function SetMatch(MixpanelIdentityContext $ctx): void {}
    public function PrePoint(MixpanelIdentityContext $ctx): void {}
    public function PreSpec(MixpanelIdentityContext $ctx): void {}
    public function PreRequest(MixpanelIdentityContext $ctx): void {}
    public function PreResponse(MixpanelIdentityContext $ctx): void {}
    public function PreResult(MixpanelIdentityContext $ctx): void {}
    public function PreDone(MixpanelIdentityContext $ctx): void {}
    public function PreUnexpected(MixpanelIdentityContext $ctx): void {}
}
