<?php
declare(strict_types=1);

// MixpanelIdentity SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelIdentityMakeContext
{
    public static function call(array $ctxmap, ?MixpanelIdentityContext $basectx): MixpanelIdentityContext
    {
        return new MixpanelIdentityContext($ctxmap, $basectx);
    }
}
