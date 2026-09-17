package core

type MixpanelIdentityError struct {
	IsMixpanelIdentityError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelIdentityError(code string, msg string, ctx *Context) *MixpanelIdentityError {
	return &MixpanelIdentityError{
		IsMixpanelIdentityError: true,
		Sdk:              "MixpanelIdentity",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelIdentityError) Error() string {
	return e.Msg
}
