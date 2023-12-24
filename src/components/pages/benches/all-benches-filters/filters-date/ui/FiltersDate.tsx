import { Button, Radio } from '@/components/shared'
import { useState } from 'react'
import styles from '@/components/pages/benches/all-benches-filters/ui/style.module.scss'

export const FiltersDate = () => {
   const [radioValue, setRadioValue] = useState('')

  const handleRadioValueChange = (value: string) => {
    setRadioValue(value)
  }

  return (
    <div>
      <div className={styles['all-benches-filters__header']}>
        <h4>Дата добавления</h4>

        <Button
          appearance={'dashed'}
          className={'ml-12'}
          onClick={() => {
            handleRadioValueChange('today')
          }}
        >
          Сбросить
        </Button>
      </div>

      <Radio.Group className={'mt-24'} onChange={handleRadioValueChange}>
        <Radio label={'сегодня'} value={'today'}/>

        <Radio label={'на этой неделе'} value={'upThisWeek'}/>

        <Radio label={'в этом месяце'} value={'thisMonth'}/>

        <Radio label={'в этом году'} value={'thisYear'}/>
      </Radio.Group>
    </div>

  )
}
