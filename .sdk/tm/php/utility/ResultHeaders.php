<?php
declare(strict_types=1);

// MixpanelIdentity SDK utility: result_headers

class MixpanelIdentityResultHeaders
{
    public static function call(MixpanelIdentityContext $ctx): ?MixpanelIdentityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
