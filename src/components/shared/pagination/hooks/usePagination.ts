'use client'

import { IPaginationProps } from '@/components/shared/pagination/interfaces'
import { useControlled } from '@/shared/lib/hooks/use-controlled'
import { ChangeEvent } from 'react'

export const usePagination = (props: IPaginationProps) => {
  const {
    page : pageProp  = 1,
    boundaryCount = 1,
    siblingCount = 1,
    countPages = 1,
    defaultPage = 1,
    showFirstButton = false,
    showLastButton = false,
    hideNextButton= false,
    hidePrevButton = false,
    disabled = false,
    onChange: handleChange,
    ...other
  } = props

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage,
    name: 'usePagination',
    state: 'page',
  })

  const handleClick = (event: ChangeEvent, value: number) => {
    if (!pageProp) {
      setPageState(value)
    }
    if (handleChange) {
      handleChange(event, value)
    }
  }

  const createRange = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, i) => start + i)
  }

  const startPages = createRange(1, Math.min(boundaryCount, countPages))
  const endPages = createRange(Math.max(countPages - boundaryCount + 1, boundaryCount + 1), countPages)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      countPages - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : countPages - 1,
  )

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < countPages - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...createRange(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < countPages - boundaryCount - 1
      ? ['end-ellipsis']
      : countPages - boundaryCount > boundaryCount
        ? [countPages - boundaryCount]
        : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ]

  const buttonPage = (type) => {
    switch (type) {
      case 'first':
        return 1
      case 'previous':
        return page - 1
      case 'next':
        return page + 1
      case 'last':
        return countPages
      default:
        return null
    }
  }
  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) => {
    return typeof item === 'number'
      ? {
        onClick: (event) => {
          handleClick(event, item)
        },
        type: 'page',
        page: item,
        selected: item === page,
        disabled,
        'aria-current': item === page ? 'true' : undefined,
      }
      : {
        onClick: (event) => {
          handleClick(event, buttonPage(item))
        },
        type: item,
        page: buttonPage(item),
        selected: false,
        disabled:
          disabled ||
          (item.indexOf('ellipsis') === -1 &&
            (item === 'next' || item === 'last' ? page >= countPages : page <= 1)),
      }
  })

  return {
    items: items.some((item) => item.type === 'page') ? items : [],
    ...other,
  }
}
