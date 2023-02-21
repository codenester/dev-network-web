import { createContext, FC, ReactNode, Reducer, useReducer } from "react";
type TLocalStorage = { theme: 'light' | 'dark', openNavBar: boolean, lang: 'en' | 'kh' }
type TLocalStorageKey = 'theme' | 'open-nav-bar' | 'lang'
type TLocalStoragePayload = { value?: string | number | boolean, getFromOriginOnly: boolean }
type TLocalStorageAction = { type: TLocalStorageKey, payload?: TLocalStoragePayload }
const localStorageReducer: Reducer<TLocalStorage, TLocalStorageAction> = (state, action) => {
  if (action.payload?.value) {
    if (!action.payload.getFromOriginOnly) {
      localStorage.setItem(action.type, action.payload.value.toString())
    }
    const item = localStorage.getItem(action.type)
    const defaultVal = action.type === 'theme' ? 'light' : action.type === 'lang' ? 'en' : ''
    return { ...state, [action.type]: item ?? defaultVal }
  }
  localStorage.removeItem(action.type)
  return { ...state, [action.type]: undefined }
}
type TRebaseItemFunc = (name: TLocalStorageKey) => void
type TSetItemFunc = (name: TLocalStorageKey, value: string | number | boolean) => void
type TRemoveItemFunc = (name: TLocalStorageKey) => void
type TLocalStorageContext = {
  localStorage: TLocalStorage,
  rebaseItem: TRebaseItemFunc,
  setItem: TSetItemFunc,
  removeItem: TRemoveItemFunc
}
export const LocalStorageContext = createContext<TLocalStorageContext>({
  localStorage: { openNavBar: false, theme: 'light', lang: 'en' },
  rebaseItem: (_) => { return },
  setItem: (_, _v) => { return },
  removeItem: (_) => { return }
})
const localStorageInitialState: TLocalStorage = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  openNavBar: Boolean(localStorage.getItem('open-nav-bar')),
  lang: localStorage.getItem('lang') === 'kh' ? 'kh' : 'en'
}
const LocalStorageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [localStorage, dispatch] = useReducer(localStorageReducer, localStorageInitialState);
  const rebaseItem: TRebaseItemFunc = (name) => {
    dispatch({ type: name, payload: { value: "", getFromOriginOnly: true } })
  }
  const setItem: TSetItemFunc = (name, value) => {
    dispatch({ type: name, payload: { value, getFromOriginOnly: false } })
  }
  const removeItem: TRebaseItemFunc = (name) => {
    dispatch({ type: name })
  }
  return (<LocalStorageContext.Provider value={{ localStorage, rebaseItem, setItem, removeItem }}>
    {children}
  </LocalStorageContext.Provider>)
}
export default LocalStorageProvider