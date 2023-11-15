export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  msg?: string
}

// 登录接口返回的数据类型
export interface loginResponseData {
  code: number
  data: dataType
}
