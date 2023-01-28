import React, { ReactElement, useState } from 'react'
import { StyledBenchesPage } from '@/pages/benches/BenchesPage.style'
import BenchesSidebar from
  '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar'
import { GetStaticProps, NextPage } from 'next'
import BenchesSort from '@/app/components/pages/Benches/BenchesSort/BenchesSort'
import { StyledContent }
  from '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar.styles'
import BenchCard
  from '@/app/components/ui/Bench/BenchCard/BenchCard'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import TagService from '@/app/services/Tag/TagService'
import { ErrorType } from '@/app/types/common.type'
import { BenchTagType, BenchesResponseType } from '@/app/types/bench.type'

const getBenches = async (): Promise<BenchesResponseType> =>
  await BenchService.getAll()
const getTags = async (): Promise<BenchTagType[]> => await TagService.getAll()

const BenchesPage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchesResponseType>({} as BenchesResponseType)
  const [tags, setTags] = useState<BenchTagType[]>([])

  useQuery<BenchesResponseType>('get benches', getBenches, {
    onSuccess: (response) => {
      setBenches(response)
    }
  })

  useQuery<BenchTagType[]>('get tags', getTags, {
    onSuccess: (response) => {
      setTags(response)
    }
  })

  return (
    <StyledBenchesPage>
      <div className="d-f flex-end mb-40">
        <h2 className="mr-40 mb-0">Все лавочки</h2>
      </div>
      <div className="d-f">
        <BenchesSidebar tags={tags} />

        <div className={'mt-42'}>
          <BenchesSort />
          <StyledContent>
            {
              benches &&
              benches.items &&
              benches.items.length
                ? (
                  benches.items.map((bench) => (
                    <BenchCard key={bench.id} bench={bench} />)
                  )
                )
                : <div>Нет данных</div>
            }
          </StyledContent>
        </div>
      </div>
    </StyledBenchesPage>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient
    .prefetchQuery<BenchesResponseType, ErrorType>('get benches', getBenches)
  await queryClient.prefetchQuery<BenchTagType[], ErrorType>('get tags', getTags)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default BenchesPage