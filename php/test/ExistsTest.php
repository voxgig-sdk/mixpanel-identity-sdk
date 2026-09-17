<?php
declare(strict_types=1);

// MixpanelIdentity SDK exists test

require_once __DIR__ . '/../mixpanelidentity_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelIdentitySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
