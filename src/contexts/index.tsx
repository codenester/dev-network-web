import { FC, createContext, Reducer, useReducer, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "../utilities";
type TCookieName = 'token' | 'deviceId' | 'refreshToken' | 'thirdPartyToken';
type TCookie = { token?: string, deviceId?: string, refreshToken?: string, thirdPartyToken?: string }
type TCookiePayload = { value?: string, getFromOriginOnly: boolean }
type TCookieAction = { type: TCookieName, payload?: TCookiePayload }
const cookieReducer: Reducer<TCookie, TCookieAction> = (state, action) => {
  if (action.payload?.value) {
    if (!action.payload.getFromOriginOnly) {
      setCookie({ name: action.type, value: action.payload.value })
    }
    const cookie = getCookie(action.type)
    return { ...state, [action.type]: cookie }
  }
  deleteCookie(action.type)
  return { ...state, [action.type]: undefined };
}
type TCookieArgs = { name: TCookieName, value?: string }
type TSetCookieFunc = (args: TCookieArgs) => void
type TRemoveCookieFunc = (args: TCookieName) => void
type TRebaseCookieFunc = (args: TCookieArgs) => void
type TCookieContext = {
  cookie: TCookie,
  setCookie: TSetCookieFunc,
  removeCookie: TRemoveCookieFunc,
  rebaseCookie: TRebaseCookieFunc
}

const cookieInitialState: TCookie = { token: getCookie('token') }
export const CookieContext = createContext<TCookieContext>({
  cookie: {},
  setCookie: () => { return },
  removeCookie: () => { return },
  rebaseCookie: () => { return }
})
const CookieProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, dispatch] = useReducer(cookieReducer, cookieInitialState)
  const setCookie: TSetCookieFunc = (args) => {
    dispatch({ type: args.name, payload: { value: args.value, getFromOriginOnly: false } })
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