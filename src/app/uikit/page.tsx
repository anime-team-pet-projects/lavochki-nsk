import { Button, Icon } from '@/components/shared'

export default function Uikit() {
  return (
    <div className={'uikit'}>
      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <Button className={'mt-10'}>
          Смотреть все
        </Button>

        <Button appearance={'secondary'} size={'sm'}>
          Все лавочки
        </Button>

        <Button appearance={'secondary'} size={'xs'}>
          Открыть
        </Button>

        <Button appearance={'primary'} size={'xs'}>
          Открыть
        </Button>

        <Button
          appearance={'primary'}
          size={'xs'}
          prefixIcon={<Icon reversed name={'arrow'} /> }
          postfixIcon={<Icon name={'arrow'} />}
        >
          Смотреть все
        </Button>

        <Button
          appearance={'primary'}
          size={'xs'}
          prefixIcon={<Icon reversed name={'arrow'} /> }
        >
          Смотреть все
        </Button>
      </div>

      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <Button icon={<Icon name={'arrow'} />} />

        <Button icon={<Icon reversed name={'arrow'} />} />
      </div>

      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <Icon name={'profile'} />

        <Icon name={'profile'} />

        <Icon name={'arrow'} />

        <Icon reversed name={'arrow'} className={'color-dark'} />
      </div>

      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <Button as={'a'} href={'/'}>Все лавочки</Button></div>
    </div>
  )
}
