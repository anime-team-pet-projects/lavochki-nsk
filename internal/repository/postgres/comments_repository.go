package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type CommentsRepository interface {
	GetByBenchID(ctx context.Context, id string) ([]domain.Comment, error)
	GetByParentID(ctx context.Context, id string) ([]domain.Comment, error)
	CreateComment(ctx context.Context, bench domain.Comment) error
	Update(ctx context.Context, comment domain.Comment) error
	GetByID(ctx context.Context, id string) (domain.Comment, error)
}

type commentsRepository struct {
	db *bun.DB
}

func NewCommentsRepository(db *bun.DB) CommentsRepository {
	return &commentsRepository{db: db}
}

// GetByBenchID Получение всех комментариев по ID лавочки
func (repository *commentsRepository) GetByBenchID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("bench_id = ? AND parent_id is ?", id, nil).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

// GetByParentID Получение всех комментариев по ID родители
func (repository *commentsRepository) GetByParentID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("parent_id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

// GetByID Получение комментария по ID
func (repository *commentsRepository) GetByID(ctx context.Context, id string) (domain.Comment, error) {
	comment := commentModel{}
	err := repository.db.NewSelect().Model(&comment).Where("comments.id = ?", id).Scan(ctx)
	if err != nil {
		return domain.Comment{}, err
	}
	return commentModelToDomain(comment), nil
}

// CreateComment Создание комментария
func (repository *commentsRepository) CreateComment(ctx context.Context, comment domain.Comment) error {
	model := commentModel{}
	model.FromDomain(comment)
	model.ID = ulid.Make().String()
	_, err := repository.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

// Update Обновление комментария
func (repository *commentsRepository) Update(ctx context.Context, comment domain.Comment) error {
	model := commentModel{}
	model.FromDomain(comment)

	_, err := repository.db.NewUpdate().
		Model(&model).
		OmitZero().
		WherePK().
		Exec(ctx)

	if err != nil {
		return err
	}

	return nil
}
