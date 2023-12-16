import styles from './styles.module.scss'
import { BenchTypes } from '@/shared/types/bench'
import { Button, Icon } from '@/components/shared'
import { LatestBenchSlider } from '@/components/pages/home/latest-bench/latest-bench-slider'
import Link from 'next/link'

interface IBenchProps {
  bench: BenchTypes.One
}

export const LatestBench = ({ bench }: IBenchProps) => {
  return (
    <div className={styles['latest-bench']}>
      <div className={styles['latest-bench__info']}>
        <p className={styles['latest-bench__title']}>
          Лавочка №{ bench.id }
        </p>

        <div className={styles['latest-bench__street']}>
          <p>
            { bench.street }
          </p>

          <button type={'button'}>
            <Icon name={'location'} />
          </button>
        </div>

        <Button as={Link} appearance={'secondary'} size={'sm'} href={`/bench/${bench.id}`} className={styles['latest-bench__link-button']}>
          Смотреть
        </Button>
      </div>

      <LatestBenchSlider images={bench.images} />
    </div>
  )
}
