import { FC, ReactNode, Reducer, createContext, useContext, useReducer } from "react";
import { TMe } from "../utilities/types";
type TProfileAction = {
  type: 'username' | 'address' | 'khAddress' | 'birthDate' | 'countryId' | 'createdAt' | 'currentRole' | 'currentType' | 'email' | 'phone' | 'gender' | 'firstname' | 'lastname' | 'khFirstname' | 'khLastname' | 'uid' | 'mailVerified' | 'phoneVerified' | 'twoFactorEnabled' | 'roles' | 'types' | 'all',
  payload?: TMe | string | number | Date | boolean | any[]
}
const profileReducer: Reducer<TMe, TProfileAction> = (state, action) => {
  if (action.type === 'all') {
    return action.payload as TMe
  }
  return { ...state, [action.type]: action.payload }
}
type TProfileContext = {
  user?: TMe,
  setUser: (_: TMe) => void,
  setUsername: (_: string) => void,
  setAddress: (_?: string) => void,
  setKhAddress: (_?: string) => void,
  setBirthDate: (_?: Date) => void,
  setCountryId: (_: number) => void,
  setCreatedAt: (_: Date) => void,
  setCurrentRole: (_: string) => void,
  setCurrentType: (_: string) => void,
  setEmail: (_?: string) => void,
  setPhone: (_?: string) => void,
  setGender: (_?: string) => void,
  setFirstname: (_?: string) => void,
  setKhFirstname: (_?: string) => void,
  setKhLastname: (_?: string) => void,
  setLastname: (_?: string) => void,
  setUid: (_?: string) => void,
  setMailVerified: (_: boolean) => void,
  setPhoneVerified: (_: boolean) => void,
  setTwoFactorEnabled: (_: boolean) => void,
  setRoles: (_?: any[]) => void,
  setTypes: (_?: any[]) => void,
}
export const ProfileContext = createContext<TProfileContext>({
  setUser: (_: TMe) => { },
  setUsername: (_: string) => { },
  setAddress: (_?: string) => { },
  setKhAddress: (_?: string) => { },
  setBirthDate: (_?: Date) => { },
  setCountryId: (_: number) => { },
  setCreatedAt: (_: Date) => { },
  setCurrentRole: (_: string) => { },
  setCurrentType: (_: string) => { },
  setEmail: (_?: string) => { },
  setPhone: (_?: string) => { },
  setGender: (_?: string) => { },
  setFirstname: (_?: string) => { },
  setKhFirstname: (_?: string) => { },
  setKhLastname: (_?: string) => { },
  setLastname: (_?: string) => { },
  setUid: (_?: string) => { },
  setMailVerified: (_: boolean) => { },
  setPhoneVerified: (_: boolean) => { },
  setTwoFactorEnabled: (_: boolean) => { },
  setRoles: (_?: any[]) => { },
  setTypes: (_?: any[]) => { },
})
const initialUser: TMe = {
  username: '',
  countryId: 0,
  createdAt: new Date(1),
  currentRole: "",
  currentType: "",
  twoFactorEnabled: false,
  mailVerified: false,
  phoneVerified: false,
}
type TStringFunc = (v: string) => void
type TBooleanFunc = (v: boolean) => void
type TNullableStringFunc = (v?: string) => void
type TNumFunc = (v: number) => void
type TNullableArrayOfAnyFunc = (v?: any[]) => void
type TMeFunc = (v: TMe) => void
type TNullableDateFunc = (v?: Date) => void
type TDateFunc = (v: Date) => void
const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, dispatch] = useReducer(profileReducer, initialUser)
  const setUsername: TStringFunc = payload => {
    dispatch({ type: 'username', payload })
  }
  const setUser: TMeFunc = payload => {
    dispatch({ type: 'all', payload })
  }
  const setEmail: TNullableStringFunc = payload => {
    dispatch({ type: 'email', payload })
  }
  const setPhone: TNullableStringFunc = payload => {
    dispatch({ type: 'phone', payload })
  }
  const setGender: TNullableStringFunc = payload => {
    dispatch({ type: 'gender', payload })
  }
  const setUid: TNullableStringFunc = payload => {
    dispatch({ type: 'uid', payload })
  }
  const setAddress: TNullableStringFunc = payload => {
    dispatch({ type: 'address', payload })
  }
  const setKhAddress: TNullableStringFunc = payload => {
    dispatch({ type: 'khAddress', payload })
  }
  const setFirstname: TNullableStringFunc = payload => {
    dispatch({ type: 'firstname', payload })
  }
  const setKhFirstname: TNullableStringFunc = payload => {
    dispatch({ type: 'khFirstname', payload })
  }
  const setLastname: TNullableStringFunc = payload => {
    dispatch({ type: 'lastname', payload })
  }
  const setKhLastname: TNullableStringFunc = payload => {
    dispatch({ type: 'khLastname', payload })
  }
  const setCurrentRole: TNullableStringFunc = payload => {
    dispatch({ type: 'currentRole', payload })
  }
  const setCurrentType: TNullableStringFunc = payload => {
    dispatch({ type: 'currentType', payload })
  }
  const setBirthDate: TNullableDateFunc = payload => {
    dispatch({ type: 'birthDate', payload })
  }
  const setCreatedAt: TDateFunc = payload => {
    dispatch({ type: 'createdAt', payload })
  }
  const setCountryId: TNumFunc = payload => {
    dispatch({ type: 'countryId', payload })
  }
  const setMailVerified: TBooleanFunc = payload => {
    dispatch({ type: 'mailVerified', payload })
  }
  const setPhoneVerified: TBooleanFunc = payload => {
    dispatch({ type: 'phoneVerified', payload })
  }
  const setTwoFactorEnabled: TBooleanFunc = payload => {
    dispatch({ type: 'twoFactorEnabled', payload })
  }
  const setRoles: TNullableArrayOfAnyFunc = payload => {
    dispatch({ type: 'roles', payload })
  }
  const setTypes: TNullableArrayOfAnyFunc = payload => {
    dispatch({ type: 'types', payload })
  }
  return (
    <ProfileContext.Provider value={{ user, setAddress, setBirthDate, setCountryId, setCreatedAt, setCurrentRole, setCurrentType, setEmail, setFirstname, setGender, setKhAddress, setKhFirstname, setKhLastname, setLastname, setMailVerified, setPhone, setPhoneVerified, setRoles, setTwoFactorEnabled, setTypes, setUid, setUser, setUsername }}>
      {children}
    </ProfileContext.Provider>
  )
}
export default ProfileProvider