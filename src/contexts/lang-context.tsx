import { FC, ReactNode, createContext, useState } from "react";
import { TLang } from "../utilities/types";
export const LangContext = createContext<{ lang: TLang | undefined, setLang: (l: TLang) => void }>({ lang: undefined, setLang: (l) => { return } })
const LangProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLanguage] = useState<TLang>()
  const setLang = (l: TLang) => {
    setLanguage(_ => l)
  }
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
export default LangProvider