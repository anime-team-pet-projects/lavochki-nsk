package model

type SortOptions interface {
	GetOrderBy() string
}

type PaginateOptions interface {
	GetPage() uint64
	GetPerPage() uint64
}

type FilterOptions interface {
	GetFilters() []map[string]any
}
