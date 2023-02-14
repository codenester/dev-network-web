import { FC, createContext, Reducer, useReducer, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "../utilities";
type TCookieName = 'token' | 'deviceId' | 'refreshToken' | 'thirdPartyToken';
type TCookie = { token?: string, deviceId?: string, refreshToken?: string, thirdPartyToken?: string }
type TCookieAction = { type: TCookieName, payload?: string }
const cookieReducer: Reducer<TCookie, TCookieAction> = (state, action) => {
  if (action.payload) {
    setCookie({ name: action.type, value: action.payload })
    return { ...state, [action.type]: action.payload }
  }
  deleteCookie(action.type)
  return { ...state, [action.type]: undefined };
}
type TCookieArgs = { name: TCookieName, value: string }
type TSetCookieFunc = (args: TCookieArgs) => void
type TRemoveCookieFunc = (args: TCookieName) => void
type TCookieContext = { cookie: TCookie, setCookie: TSetCookieFunc, removeCookie: TRemoveCookieFunc }

const cookieInitialState: TCookie = { token: getCookie('token') }
export const CookieContext = createContext<TCookieContext>({
  cookie: {},
  setCookie: () => { return },
  removeCookie: () => { return }
})
const CookieProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookie, dispatch] = useReducer(cookieReducer, cookieInitialState)
  const setCookie = (args: TCookieArgs) => {
    dispatch({ type: args.name, payload: args.value })
  }
  const removeCookie = (args: TCookieName) => {
    if (cookie[args]) dispatch({ type: args })
  }
  return (
    <CookieContext.Provider value={{ cookie, setCookie, removeCookie }}>
      {children}
    </CookieContext.Provider>
  )
}
export default CookieProvider;