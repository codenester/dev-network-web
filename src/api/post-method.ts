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
export type TLoginInput = { username?: string, password: string }
export type TProviderAuthKey = 'facebook' | 'google' | 'github'
export const login = async (data?: TLoginInput, key?: TProviderAuthKey): Promise<TLoginResponse> => {
  let uid = ""
  if (key) {
    let provider: AuthProvider
    switch (key) {
      case 'facebook':
        provider = new FacebookAuthProvider()
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
    uid = result.user.uid
    setCookie({ name: import.meta.env.VITE_THIRD_PARTY_TOKEN, value: token, expire: 1 })
    data = {
      password: `${uid}Az0!`
    }
  }
  const opt = postOption(data)
  try {
    const res = await fetch(apiMap.mutation.login.url, opt)
    if (res.status != 200) {
      const option = postOption()
      let r: Response = new Response()
      try {
        r = await fetch(apiMap.mutation["register-by-3rd-party"].url, option)
        const dRegister = await r.json()
        try {
          r = await fetch(apiMap.mutation.login.url, postOption({ username: dRegister.Username, password: data?.password }))
          const loginData = await r.json()
          return {
            token: loginData[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
            refreshToken: loginData[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
            deviceId: loginData[import.meta.env.VITE_COOKIE_DEVICE_ID],
            thirdPartyToken: loginData[import.meta.env.VITE_THIRD_PARTY_TOKEN]
          }
        } catch {
          throw r
        }
      } catch {
        console.log(r)
        throw r
      }
    }
    const dt = await res.json()
    return {
      token: dt[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
      refreshToken: dt[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
      deviceId: dt[import.meta.env.VITE_COOKIE_DEVICE_ID],
      thirdPartyToken: dt[import.meta.env.VITE_THIRD_PARTY_TOKEN]
    }
  } catch {
    const option = postOption()
    let r: Response = new Response()
    try {
      r = await fetch(apiMap.mutation["register-by-3rd-party"].url, option)
      const dRegister = await r.json()
      try {
        r = await fetch(apiMap.mutation.login.url, postOption({ username: dRegister.Username, password: data?.password }))
        const loginData = await r.json()
        return {
          token: loginData[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
          refreshToken: loginData[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
          deviceId: loginData[import.meta.env.VITE_COOKIE_DEVICE_ID],
          thirdPartyToken: loginData[import.meta.env.VITE_THIRD_PARTY_TOKEN]
        }
      } catch {
        throw r
      }
    } catch {
      console.log(r)
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