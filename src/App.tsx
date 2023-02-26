import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useContext, useEffect, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useMe } from './api/hook'
import './App.css'
import { CookieContext } from './contexts/cookie-context'
import { LocalStorageContext } from './contexts/local-storage-context'
import LoginRegisterPage from './pages/login-register'
import router from './routes/default-routes'
import { LangContext } from './contexts/lang-context'
import { ProfileContext } from './contexts/profile-context'
import LoadingScreen from './components/loading-screen'
import Home from './pages/home'
import langJson from './assets/lang.json'

function App() {
  const dialogs: any[] = [];
  const { cookie } = useContext(CookieContext)
  const { user, setUser } = useContext(ProfileContext)
  const { localStorage } = useContext(LocalStorageContext)
  const { setLang } = useContext(LangContext)
  const theme = useMemo(() => createTheme({
    palette: {
      mode: localStorage.theme,
      background: {
      }
    }
  }), [localStorage.theme])
  const { refetch, isLoading } = useMe({
    onError: err => console.log(err),
    onSuccess: async (res) => {
      setUser(res)
    },
  })
  useEffect(() => {
    if (cookie.token && (!user || !user.username || user.username.trim() === "")) refetch()
    if (langJson) setLang(langJson)
  }, [cookie.token, user, user?.username])
  return (
    <div className="App">
      <CssBaseline enableColorScheme>
        <ThemeProvider theme={theme}>
          <Box sx={{ position: 'fixed', display: 'flex', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'background.default', p: 0, alignItems: 'center', justifyContent: 'center' }}>
            {dialogs.some(d => d.isShow) ? <div>{dialogs.map(({ Component }, i) => (<Component key={i} />))}</div> : null}
            {cookie.token ? (isLoading ? <LoadingScreen /> : <Home><RouterProvider router={router} /></Home>) : <LoginRegisterPage />}
          </Box>
        </ThemeProvider>
      </CssBaseline>
    </div>
  )
}

export default App