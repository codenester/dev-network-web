export type TLangProp = {
  en: string,
  kh: string
}
export type TLang = {
  welcome: TLangProp,
  login: TLangProp,
  register: TLangProp,
  en: TLangProp,
  kh: TLangProp,
  dark: TLangProp,
  light: TLangProp,
  username: TLangProp,
  password: TLangProp,
  or: TLangProp,
  'no-account': TLangProp,
  'forgot-password': TLangProp,
  'app-name': TLangProp,
}
export type TMe = {
  address?: string,
  birthDate?: string,
  countryId: number,
  createdAt: Date,
  currentRole: string,
  currentType: string
  email?: string,
  firstname?: string,
  gender?: string,
  khAddress?: string,
  khFirstname?: string,
  khLastname?: string,
  lastname?: string,
  mailVerified: boolean,
  phone?: string,
  phoneVerified: boolean,
  roles?: any[],
  twoFactorEnabled: boolean,
  types?: any[],
  uid?: string,
  username: string,
}
export type TCookie = {
  token?: string,
  deviceId?: string,
  refreshToken?: string,
  thirdPartyToken?: string,
  isRegister?: boolean
}