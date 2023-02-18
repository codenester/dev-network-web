import { FC, useContext, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import apiMap from "../../api/api-map";
import { CookieContext } from "../../contexts/cookie-context";

const LoginForm: FC = () => {
  const { setCookie, rebaseCookie } = useContext(CookieContext)
  const registerClick = () => setCookie({ name: 'isRegister', value: true })
  const username = useRef('')
  const password = useRef('')
  const { isLoading, data, error, refetch } = useQuery(apiMap.query.login.name, () =>
    fetch(apiMap.query.login.url, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ username, password })
    }).then(res => res.json()).then(data => {
      console.log(data)
      rebaseCookie({ name: 'deviceId' })
      rebaseCookie({ name: 'token' })
      rebaseCookie({ name: 'refreshToken' })
      rebaseCookie({ name: 'thirdPartyToken' })
      rebaseCookie({ name: 'isRegister' })
    }).catch(e => console.log(e)), { enabled: false })
  return (
    <div>
      {error ? <p>api error</p> : isLoading ? <p>loading...</p> : null}
      <form onSubmit={v => {
        v.preventDefault()
        refetch()
      }}>
        <input type="text" onInput={v => username.current = v.currentTarget.value} placeholder="username" />
        <input type="password" onInput={v => password.current = v.currentTarget.value} placeholder="password" />
        <button type="submit">login</button>
      </form>
      <button onClick={registerClick}>register</button>
    </div>
  )
}
export default LoginForm