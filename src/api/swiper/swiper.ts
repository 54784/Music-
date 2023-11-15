import request from '@/utils/request'

import type { SwiperDataResponseData } from '@/api/swiper/types'
export const useGetswiperService = () => {
  return request.get<any, SwiperDataResponseData>('/swiper/getSwiperData')
}
