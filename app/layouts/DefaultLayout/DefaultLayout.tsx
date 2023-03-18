import { GetStaticProps, NextPage } from 'next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { DefaultLayoutHeader }
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader/DefaultLayoutHeader'
import { StyledContainer, StyledWrapper }
  from '@/app/layouts/DefaultLayout/DefaultLayout.style'
import { DefaultLayoutFooter }
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutFooter/DefaultLayoutFooter'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { UserMeType } from '@/app/types/user.type'
import UserService from '@/app/services/User/UserService'
import { UserContext } from '@/app/contexts/userContext'
import { useRouter } from 'next/router'
import { CommonLoader } from '@/app/components/Common/ui/CommonLoader/CommonLoader'
import { MapStateOptionsType } from '@/app/types/map.type'
import { MapContext } from '@/app/contexts/mapContext'

interface IProps {
    children: ReactNode
}

const getMe = async (): Promise<UserMeType> => await UserService.getMe()

export const DefaultLayout: NextPage<IProps> = ({ children }): ReactElement => {
  const [user, setUser] = useState<UserMeType>({} as UserMeType)
  const [mapState, setMapState] = useState<MapStateOptionsType>({
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ['default', 'scrollZoom'],
    controls: []
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useQuery<UserMeType>('get user', getMe, {
    onSuccess: (response) => {
      setUser(response)
    },
  })

  const dispatch = (data: MapStateOptionsType): void => {
    setMapState(data)
  }

  useEffect(() => {
    const handleStart = (url: string): boolean | void => (url !== router.asPath) && setLoading(true)
    const handleComplete = (url: string): boolean | void => (url === router.asPath) && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <MapContext.Provider value={{ mapState: mapState, dispatch }}>
      <UserContext.Provider value={user}>
        <div className={'mh-100 d-f fd-c'}>
          <DefaultLayoutHeader />
          {
            !loading
              ? (
                <StyledWrapper>
                  <StyledContainer>
                    { children }
                  </StyledContainer>
                </StyledWrapper>
              )
              : <CommonLoader />
          }
          <DefaultLayoutFooter />
        </div>
      </UserContext.Provider>
    </MapContext.Provider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<UserMeType>('get user', getMe)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
