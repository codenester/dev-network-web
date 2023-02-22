import { getCookie } from "../utilities"
import apiMap from "./api-map"
import { postOption } from "./post-method"
export const getOption = (): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
    [import.meta.env.VITE_API_KEY]: import.meta.env.VITE_API_KEY_VALUE,
    [import.meta.env.VITE_COOKIE_DEVICE_ID]: getCookie(import.meta.env.VITE_COOKIE_DEVICE_ID),
    [import.meta.env.VITE_COOKIE_REFRESH_TOKEN]: getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN),
    [import.meta.env.VITE_THIRD_PARTY_TOKEN]: getCookie(import.meta.env.VITE_THIRD_PARTY_TOKEN),
    'Authorization': `bearer ${getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN)}`
  },
  method: 'GET',
})
const getReq = (url: string, params?: { key: string, value: string | number | boolean }[]) => {
  if (params) {
    params = params?.filter(p => p.value)
    if (params.length > 0) {
      url += "?"
      url += `${params[0].key}=${params[0].value}`
      for (let p of params.slice(1)) url += `&${p.key}=${p.value}`
    }
  }
  return async (): Promise<Response> => {
    try {
      const res = await fetch(url, getOption())
      const dt = await res.json()
      return dt
    } catch (e) {
      const opt = postOption()
      if (opt.headers) {
        opt.headers[import.meta.env.VITE_COOKIE_REFRESH_TOKEN as keyof HeadersInit] = getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN)
        opt.headers['Authorization' as keyof HeadersInit] = `bearer ${getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN)}`
      }
      const r = await fetch(apiMap.query.refresh.url, opt)
      try {
        await r.json()
        const res = await fetch(url, getOption())
        try {
          const d = await res.json()
          return d
        } catch {
          throw res
        }
      } catch {
        throw r
      }
    }
  }
}
export default getReq