package dto

import validation "github.com/go-ozzo/ozzo-validation"

type RefreshToken struct {
	Token string `json:"token"`
}

func (r *RefreshToken) Validate() error {
	return validation.ValidateStruct(r,
		validation.Field(&r.Token, validation.Required))
}
