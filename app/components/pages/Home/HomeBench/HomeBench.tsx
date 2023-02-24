import React, { FC, ReactElement } from 'react'
import {
  StyledHomeBenchesSlider,
  StyledLatestBench,
  StyledLatestBenchInfoLocation,
  StyledLatestBenchInfoLocationTitle,
  StyledLatestBenchInfoTitle,
  StyledLink,
  StyledLocationButton
} from '@/app/components/pages/Home/HomeBench/HomeBench.style'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import { BenchType } from '@/app/types/bench.type'
import { scrollToTop } from '@/app/utils/scrollToTop'
import Link from 'next/link'

interface IProps {
  bench: BenchType
  moveToPlacemark: (coordinates: number[], zoom: number) => void
  openPreviewImage: (benchId: string, index: number) => void
}

export const HomeBench: FC<IProps> = ({ bench, moveToPlacemark, openPreviewImage }): ReactElement => {
  const handleScrollToTop = (coords: number[]): void => {
    scrollToTop()

    moveToPlacemark(coords, 18)
  }

  return (
    <StyledLatestBench>
      <div className={'d-f fd-c'}>
        <StyledLatestBenchInfoTitle>
          Лавочка №{bench.id}
        </StyledLatestBenchInfoTitle>
        <StyledLatestBenchInfoLocation>
          <StyledLatestBenchInfoLocationTitle>
            { bench.address }
          </StyledLatestBenchInfoLocationTitle>
          <StyledLocationButton onClick={() => handleScrollToTop([bench.lat, bench.lng])}>
            <CommonIcon name="location" width={24} height={32} />
          </StyledLocationButton>
        </StyledLatestBenchInfoLocation>
        <Link href={`/benches/${bench.id}`} passHref shallow>
          <StyledLink>Смотреть</StyledLink>
        </Link>
      </div>

      {
        bench.images
        && bench.images.length
          ? <StyledHomeBenchesSlider bench={bench} openPreviewImage={openPreviewImage} />
          : null
      }

    </StyledLatestBench>
  )
}