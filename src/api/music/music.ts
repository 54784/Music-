import request from '@/utils/request'

// 获取歌单  data 数据条数  传值就使用 不传默认10
export const useGetSongSheetServer = (data: number = 10) => {
  return request.get(`/songSheet/getSongSheet/?limit=${data}`)
}

// 获取歌单详情
export const useGetSongSheetDetailServer = (data: string) => {
  return request.get(`/songSheet/getMusicDetail/?songSheetId=${data}`)
}

// 获取音乐
export const useGetMusicServer = () => {
  return request.post('/music/getMusic')
}

// 获取歌词
export const useGetLyricsServer = (data: string) => {
  return request.get(`lyric/getLyrics/?id=${data}`)
}
