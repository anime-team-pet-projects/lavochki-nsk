package bot

import (
	"encoding/json"
	"net/http"

	"benches/internal/apperror"
	"benches/internal/dto"
	botPolicy "benches/internal/policy/bot"
	"benches/internal/transport/httpv1"

	"github.com/gorilla/mux"
)

type Handler struct {
	httpv1.BaseHandler
	policy *botPolicy.Policy
}

const (
	urlAuthBot      = "/auth"
	urlRefreshToken = "/refresh"
)

func NewHandler(policy *botPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	// Авторизация бота
	router.HandleFunc(urlAuthBot, apperror.Middleware(handler.authorization))
	router.HandleFunc(urlRefreshToken, apperror.Middleware(handler.refreshToken))
}

// @Summary Authorization bot
// @Tags Bot
// @Produce json
// @Param user body dto.AuthorizationBot true "bot info"
// @Success 200
// @Failure 403
// @Router /api/v1/bot/auth [post]
func (handler *Handler) authorization(w http.ResponseWriter, r *http.Request) error {
	var bot dto.AuthorizationBot
	if err := json.NewDecoder(r.Body).Decode(&bot); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := bot.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	token, refreshToken, err := handler.policy.AuthorizationBot(r.Context(), bot.ToDomain())
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}
	handler.ResponseJson(w, map[string]string{"access": token, "refresh": refreshToken}, 200)
	return nil
}

// @Summary Bot refresh token
// @Tags Bot
// @Produce json
// @Param Authorization header string true "Bearer"
// @Param token body dto.RefreshToken true "token info"
// @Success 200
// @Failure 400
// @Router /api/v1/bot/refresh [post]
func (handler *Handler) refreshToken(w http.ResponseWriter, r *http.Request) error {
	var token dto.RefreshToken
	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		return apperror.ErrIncorrectDataToken
	}

	// Валидация
	if err := token.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	accessToken, refreshToken, err := handler.policy.RefreshToken(r.Context(), token.Token)
	if err != nil {
		return apperror.ErrIncorrectDataToken
	}
	handler.ResponseJson(w, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
	return nil
}
