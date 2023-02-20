import { FC, createContext, Reducer, useReducer, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "../utilities";
type TCookieName = 'token' | 'deviceId' | 'refreshToken' | 'thirdPartyToken' | 'isRegister';
type TCookie = { token?: string, deviceId?: string, refreshToken?: string, thirdPartyToken?: string, isRegister?: boolean }
type TCookiePayload = { value?: string | boolean, expire?: number, getFromOriginOnly: boolean }
type TCookieAction = { type: TCookieName, payload?: TCookiePayload }
const cookieReducer: Reducer<TCookie, TCookieAction> = (state, action) => {
  const envMap = action.type === 'token' ? import.meta.env.VITE_COOKIE_ACCESS_TOKEN :
    action.type === 'deviceId' ? import.meta.env.VITE_COOKIE_DEVICE_ID :
      action.type === 'refreshToken' ? import.meta.env.VITE_COOKIE_REFRESH_TOKEN :
        action.type === 'thirdPartyToken' ? import.meta.env.VITE_THIRD_PARTY_TOKEN : 'is-register'
  if (action.payload?.value) {
    if (!action.payload.getFromOriginOnly) {
      setCookie({ name: envMap, value: action.payload.value.toString(), expire: action.payload.expire })
    }
    const cookie = getCookie(envMap)
    return { ...state, [action.type]: action.type === 'isRegister' ? Boolean(cookie) : cookie }
  }
  deleteCookie(envMap)
  return { ...state, [action.type]: undefined };
}
type TCookieArgs = { name: TCookieName, value?: string | boolean, expire?: number }
type TSetCookieFunc = (args: TCookieArgs) => void
type TRemoveCookieFunc = (args: TCookieName) => void
type TRebaseCookieFunc = (args: TCookieArgs) => void
type TCookieContext = {
  cookie: TCookie,
  setCookie: TSetCookieFunc,
  removeCookie: TRemoveCookieFunc,
  rebaseCookie: TRebaseCookieFunc
}

const cookieInitialState: TCookie = {
  token: getCookie(import.meta.env.VITE_COOKIE_ACCESS_TOKEN),
  refreshToken: getCookie(import.meta.env.VITE_COOKIE_REFRESH_TOKEN),
  deviceId: getCookie(import.meta.env.VITE_COOKIE_DEVICE_ID),
  thirdPartyToken: getCookie(import.meta.env.VITE_THIRD_PARTY_TOKEN),
  isRegister: Boolean(getCookie('is-register'))
}
export const CookieContext = createContext<TCookieContext>({
  cookie: {},
  setCookie: () => { return },
  removeCookie: () => { return },
  rebaseCookie: () => { return }
})
const CookieProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, dispatch] = useReducer(cookieReducer, cookieInitialState)
  const setCookie: TSetCookieFunc = (args) => {
    dispatch({ type: args.name, payload: { value: args.value, getFromOriginOnly: false, expire: args.expire } })
  }
  const removeCookie: TRemoveCookieFunc = (args) => {
    if (cookie[args]) dispatch({ type: args })
  }
  const rebaseCookie: TRebaseCookieFunc = (args) => {
    dispatch({ type: args.name, payload: { getFromOriginOnly: true } })
  }
  return (
    <CookieContext.Provider value={{ cookie, setCookie, removeCookie, rebaseCookie }}>
      {children}
    </CookieContext.Provider>
  )
}
export default CookieProvider;