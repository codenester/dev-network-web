import { FC, ReactNode, useContext } from "react";
import { useLogout } from "../api/hook";
import { CookieContext } from "../contexts/cookie-context";
import TopBar from "../components/utilities/nav-bars/TopBar";
import SideBar from "../components/utilities/nav-bars/SideBar";
import { Button } from "@mui/material";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
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
      <TopBar />
      <SideBar />
      {children}
      <Button color="error" variant="contained" onClick={logout}>Logout</Button>
    </div>
  )
}
export default Home