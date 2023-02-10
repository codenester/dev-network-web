import { TDialog } from "../components/utilities/dialogs/BaseDialog";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
export function setCookie(opt: { name: string, value: string, expire?: number }) {
  const { name, value, expire } = opt;
  const d = new Date();
  d.setTime(d.getTime() + ((expire ?? 1) * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
  // name + "=" + value + ";" + expires + ";path=/";
}
export function deleteCookie(name: string) {
  if (checkCookie(name)) {
    const d = new Date()
    const pastDate = new Date(d.getFullYear() - 1, 1, 1);
    const exp = "expires=" + pastDate.toUTCString();
    document.cookie = `${name}=;${exp};path=/`;
  }
}
export function getCookie(name: string) {
  let n = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(n) == 0) {
      return c.substring(n.length, c.length);
    }
  }
  return "";
}
export function checkCookie(name: string) {
  let username = getCookie(name);
  if (username) return true
  return false
}
export type TDialogState = {
  Component: TDialog,
  type: 'modal' | 'box-only',
  isShow: boolean
}
const initialState: TDialogState[] = [];

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    add(state, action: PayloadAction<TDialogState>) {
      state.push(action.payload);
    },
    remove(state) {
      state.pop();
    },
  },
});
export type TCookie = {
  token?: string,
  deviceId?: string,
  refreshToken?: string,
  thirdPartyToken?: string,
}
const cookieState: TCookie = {
  token: getCookie(import.meta.env.COOKIE_ACCESS_TOKEN),
  deviceId: getCookie(import.meta.env.COOKIE_DEVICE_ID),
  refreshToken: getCookie(import.meta.env.COOKIE_REFRESH_TOKEN),
  thirdPartyToken: getCookie(import.meta.env.THIRD_PARTY_TOKEN)
}
export type TCookiePayloadProps = {
  key: 'token' | 'deviceId' | 'refreshToken' | 'thirdPartyToken',
  value: string,
  duration?: number
}
export const cookieSlice = createSlice({
  name: "cookie",
  initialState: cookieState,
  reducers: {
    set(state, action: PayloadAction<TCookiePayloadProps>) {
      const { key: name, value, duration: expire } = action.payload
      setCookie({ name, value, expire });
      state[name] = value
    }
  }
})

export const store = configureStore({
  reducer: {
    dialogs: dialogSlice.reducer,
    cookie: cookieSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
