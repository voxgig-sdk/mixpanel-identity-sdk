-- MixpanelIdentity SDK error

local MixpanelIdentityError = {}
MixpanelIdentityError.__index = MixpanelIdentityError


function MixpanelIdentityError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelIdentityError)
  self.is_sdk_error = true
  self.sdk = "MixpanelIdentity"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelIdentityError:error()
  return self.msg
end


function MixpanelIdentityError:__tostring()
  return self.msg
end


return MixpanelIdentityError
