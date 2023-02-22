import { FC, ReactNode, useContext } from "react";
import { useLogout } from "../api/hook";
import { CookieContext } from "../contexts/cookie-context";
import TopBar from "../components/utilities/nav-bars/top-bar";
import SideBar from "../components/utilities/nav-bars/side-bar";
import { Box, Button } from "@mui/material";
import Header from "../components/layouts/headers/header";
import BottomBar from "../components/utilities/nav-bars/bottom-bar";
import Footer from "../components/layouts/footers/footer";

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
    <Box display='flex' position='fixed' top={0} left={0} right={0} bottom={0} overflow='hidden'>
      <SideBar />
      <Box flex={1} display='flex' flexDirection='column'>
        <Header>
          <TopBar />
        </Header>
        <Box flex={1} display='flex' flexDirection='column'>
          {children}
          <Button color="error" variant="contained" onClick={logout}>Logout</Button>
        </Box>
        <Footer>
          <BottomBar />
        </Footer>
      </Box>
    </Box>
  )
}
export default Home