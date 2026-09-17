# MixpanelIdentity SDK exists test

import pytest
from mixpanelidentity_sdk import MixpanelIdentitySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelIdentitySDK.test(None, None)
        assert testsdk is not None
