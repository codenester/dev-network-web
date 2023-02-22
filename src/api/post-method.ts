import { AuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCookie, setCookie } from "../utilities";
import apiMap from "./api-map";
import { auth } from "../main";
import { TLoginResponse } from "../utilities/types";

export const postOption = (body: any = {}): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
    [import.meta.env.VITE_API_KEY]: import.meta.env.VITE_API_KEY_VALUE,
    [import.meta.env.VITE_COOKIE_DEVICE_ID]: getCookie(import.meta.env.VITE_COOKIE_DEVICE_ID),
    [import.meta.env.VITE_COOKIE_REFRESH_TOKEN]: getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN),
    [import.meta.env.VITE_THIRD_PARTY_TOKEN]: getCookie(import.meta.env.VITE_THIRD_PARTY_TOKEN),
    'Authorization': `bearer ${getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN)}`
  },
  method: 'POST',
  body: JSON.stringify(body)
})
export type TLoginInput = { username: string, password: string }
export const login = async (data: TLoginInput): Promise<TLoginResponse> => {
  const res = await fetch(apiMap.mutation.login.url, postOption(data))
  try {
    const dt = await res.json()
    return {
      token: dt[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
      refreshToken: dt[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
      deviceId: dt[import.meta.env.VITE_COOKIE_DEVICE_ID],
      thirdPartyToken: dt[import.meta.env.VITE_THIRD_PARTY_TOKEN]
    }
  } catch {
    throw res
  }
}
export type TProviderAuthKey = 'facebook' | 'google' | 'github'
export const providerAuthLogin = async (providerKey: TProviderAuthKey) => {
  let provider: AuthProvider
  switch (providerKey) {
    case 'facebook':
      provider = new GoogleAuthProvider()
      break
    case 'github':
      provider = new GithubAuthProvider()
      break
    default:
      provider = new GoogleAuthProvider()
      break
  }
  const result = await signInWithPopup(auth, provider)
  const token = await result.user.getIdToken()
  setCookie({ name: import.meta.env.VITE_THIRD_PARTY_TOKEN, value: token, expire: 1 })
  const loginInput: TLoginInput = {
    username: "",
    password: `${result.user.uid}Az0!`
  }
  try {
    const res = await fetch(apiMap.mutation.login.url, postOption(loginInput))
    const dt = await res.json()
    return dt
  } catch {
    const r = await fetch(apiMap.mutation["register-by-3rd-party"].url, postOption())
    try {
      const user = await r.json()
      const rs = await fetch(apiMap.mutation.login.url, postOption({ username: user.username, password: `${result.user.uid}Az0!` }))
      try {
        const data = await rs.json()
        return data
      } catch {
        throw rs
      }
    } catch {
      throw r
    }
  }
}
const postReq = async <T>(url: string, data?: T): Promise<T> => {
  try {
    const res = await fetch(url, postOption(data))
    const dt: T = await res.json()
    return dt
  } catch (e) {
    console.log(e)
    const opt = postOption()
    if (opt.headers) {
      opt.headers[import.meta.env.VITE_COOKIE_REFRESH_TOKEN as keyof HeadersInit] = getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN)
      opt.headers['Authorization' as keyof HeadersInit] = `bearer ${getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN)}`
    }
    const r = await fetch(apiMap.query.refresh.url, opt)
    try {
      await r.json()
      const res = await fetch(url, postOption(data))
      try {
        const d: T = await res.json()
        return d
      } catch {
        throw res
      }
    } catch {
      throw r
    }
  }
}
export default postReq