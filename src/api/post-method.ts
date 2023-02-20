import { getCookie } from "../utilities";
import apiMap from "./api-map";

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
export const LoginFunc = (data: TLoginInput) => {
  return fetch(apiMap.mutation.login.url, postOption(data))
}
const postReq = <T>(url: string, data?: T) => async (): Promise<T> => {
  try {
    const res = await fetch(url, postOption(data))
    const dt:T = await res.json()
    return dt
  } catch (e) {
    console.log(e)
    const opt = postOption()
    if (opt.headers) {
      opt.headers[import.meta.env.VITE_COOKIE_REFRESH_TOKEN as keyof HeadersInit] = getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN)
      opt.headers['Authorization' as keyof HeadersInit] = `bearer ${getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN)}`
    }
    const r = await fetch(apiMap.query.refresh.url, opt)
    await r.json()
    const res = await fetch(url, postOption(data))
    const d:T = await res.json()
    return d
  }
}
export default postReq