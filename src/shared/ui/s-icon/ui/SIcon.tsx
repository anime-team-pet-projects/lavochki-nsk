import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'shared/ui/s-icon/ui/styles.module.scss'

interface IProps {
  name: string
  className?: string
  prefix?: string
  reverse?: boolean
  width?: number | string
  height?: number | string
}

const cx = cnBind.bind(styles)

export const SIcon = ({ prefix = 'icon', reverse = false, className, name, width = '1em', height = '1em' }: IProps) => {
  const classNames = cn('s-icon', cx({ 's-icon--reversed': reverse }), className, `s-icon--${name}`)
  const symbolId = `#${prefix}-${name}`

  return (
    <>
      <svg className={classNames} width={width}
height={height} aria-hidden="true">
        <use href={symbolId} />
      </svg>
    </>
  )
}
