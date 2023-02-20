import { FC, useContext } from "react";
import { useLogout } from "../api/hook";
import { CookieContext } from "../contexts/cookie-context";

const Home: FC = () => {
  const { removeCookie } = useContext(CookieContext)
  const { refetch } = useLogout({
    onError: (err: Error) => console.log(err.message)
  })
  const logout = () => {
    refetch()
    removeCookie('deviceId')
    removeCookie('refreshToken')
    removeCookie('token')
    removeCookie('thirdPartyToken')
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
export default Home