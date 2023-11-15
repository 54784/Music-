export interface ResponseData {
  code: number
  message: string
}

export interface SwiperData {
  _id?: string
  dataname: string
  dataUrl: string
}

export interface SwiperDataResponseData extends ResponseData {
  data: SwiperData
}
