# MixpanelIdentity SDK feature factory

from mixpanelidentity_sdk.feature.base_feature import MixpanelIdentityBaseFeature
from mixpanelidentity_sdk.feature.debug_feature import MixpanelIdentityDebugFeature
from mixpanelidentity_sdk.feature.idempotency_feature import MixpanelIdentityIdempotencyFeature
from mixpanelidentity_sdk.feature.metrics_feature import MixpanelIdentityMetricsFeature
from mixpanelidentity_sdk.feature.paging_feature import MixpanelIdentityPagingFeature
from mixpanelidentity_sdk.feature.ratelimit_feature import MixpanelIdentityRatelimitFeature
from mixpanelidentity_sdk.feature.retry_feature import MixpanelIdentityRetryFeature
from mixpanelidentity_sdk.feature.test_feature import MixpanelIdentityTestFeature
from mixpanelidentity_sdk.feature.timeout_feature import MixpanelIdentityTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelIdentityBaseFeature(),
    "debug": lambda: MixpanelIdentityDebugFeature(),
    "idempotency": lambda: MixpanelIdentityIdempotencyFeature(),
    "metrics": lambda: MixpanelIdentityMetricsFeature(),
    "paging": lambda: MixpanelIdentityPagingFeature(),
    "ratelimit": lambda: MixpanelIdentityRatelimitFeature(),
    "retry": lambda: MixpanelIdentityRetryFeature(),
    "test": lambda: MixpanelIdentityTestFeature(),
    "timeout": lambda: MixpanelIdentityTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
