import { FC, FormEvent, useContext, useMemo, useRef, useState } from "react";
import { useLogin } from "../../api/hook";
import { CookieContext } from "../../contexts/cookie-context";
type TLoginResponse = {
  token: string,
  refreshToken: string,
  thirdPartyToken?: string,
  deviceId: string
}

const LoginForm: FC = () => {
  const { setCookie } = useContext(CookieContext)
  const registerClick = () => setCookie({ name: 'isRegister', value: true })
  const username = useRef("")
  const password = useRef("")
  const { isLoading, isError, error, mutate } = useLogin({
    onSuccess: async (data: Response) => {
      const jsonData = await data.json()
      const result: TLoginResponse = {
        token: jsonData[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
        refreshToken: jsonData[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
        deviceId: jsonData[import.meta.env.VITE_COOKIE_DEVICE_ID],
        thirdPartyToken: jsonData[import.meta.env.VITE_THIRD_PARTY_TOKEN]
      }
      setCookie({ name: 'token', value: result.token, expire: 1 })
      setCookie({ name: 'deviceId', value: result.deviceId, expire: 15 })
      setCookie({ name: 'refreshToken', value: result.refreshToken, expire: 15 })
      setCookie({ name: 'thirdPartyToken', value: result.thirdPartyToken, expire: 1 })
    }
  })
  const handleSubmit = (v: FormEvent) => {
    v.preventDefault()
    mutate({ username: username.current, password: password.current })
  }
  return (
    <div>
      {isError ? <p>{(error as Error).message}</p> : isLoading ? <p>loading...</p> : null}
      <form onSubmit={handleSubmit}>
        <input type="text" onInput={e => username.current = e.currentTarget.value} placeholder="username" />
        <input type="password" onInput={e => password.current = e.currentTarget.value} placeholder="password" />
        <button type="submit">login</button>
      </form>
      <button onClick={registerClick}>register</button>
    </div>
  )
}
export default LoginForm