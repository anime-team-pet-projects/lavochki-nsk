package domain

import "time"

type User struct {
	ID         string `json:"id"`
	Username   string `json:"username"`
	TelegramID int    `json:"telegram_id"`
	Role       string `json:"role"`
}

type TelegramUser struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	PhotoUrl  string `json:"photo_url"`
	AuthDate  int    `json:"auth_date"`
	Hash      string `json:"hash"`
}

type TokenCredentials struct {
	Access  string `json:"access,omitempty"`
	Refresh string `json:"refresh,omitempty"`
}

type TokenLifetime struct {
	Access  time.Duration
	Refresh time.Duration
}

func CreateTokenLifetime(access, refresh int) TokenLifetime {
	return TokenLifetime{
		Access:  time.Duration(access) * time.Minute,
		Refresh: time.Duration(refresh) * time.Minute,
	}
}
