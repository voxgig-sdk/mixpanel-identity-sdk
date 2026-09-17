# MixpanelIdentity SDK utility: make_context

from mixpanelidentity_sdk.core.context import MixpanelIdentityContext


def make_context_util(ctxmap, basectx):
    return MixpanelIdentityContext(ctxmap, basectx)
