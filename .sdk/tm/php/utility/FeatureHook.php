<?php
declare(strict_types=1);

// MixpanelIdentity SDK utility: feature_hook

class MixpanelIdentityFeatureHook
{
    public static function call(MixpanelIdentityContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
