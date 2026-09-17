<?php
declare(strict_types=1);

// MixpanelIdentity SDK utility: result_body

class MixpanelIdentityResultBody
{
    public static function call(MixpanelIdentityContext $ctx): ?MixpanelIdentityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
