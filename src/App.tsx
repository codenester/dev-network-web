import { Box, colors, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useMe } from './api/hook';
import './App.css'
import { CookieContext } from './contexts/cookie-context';
import { LocalStorageContext } from './contexts/local-storage-context';
import LoginRegisterPage from './pages/login-register';
import router from './routes/default-routes'
import { useQuery } from 'react-query';
import { TLang } from './utilities/types';
import { LangContext } from './contexts/lang-context';
import { ProfileContext } from './contexts/profile-context';
import LoadingScreen from './components/loading-screen';
import Home from './pages/home';
async function getLang(): Promise<TLang> {
  const res = await fetch('/lang.json')
  const data = await res.json()
  return data
}

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
  const { isLoading: langLoading } = useQuery('lang', () => getLang(), { onSuccess: setLang, onError: e => console.log(e), refetchOnWindowFocus: false })
  const { refetch, isLoading } = useMe({
    onError: err => console.log(err),
    onSuccess: async (res) => {
      setUser(res)
    },
  })
  useEffect(() => {
    if (cookie.token && (!user || !user.username || user.username.trim() === "")) refetch()
  }, [cookie.token, user, user?.username])
  return (
    <div className="App">
      <CssBaseline enableColorScheme>
        <ThemeProvider theme={theme}>
          <Box sx={{ position: 'fixed', display: 'flex', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'background.default', p: 0, alignItems: 'center', justifyContent: 'center' }}>
            {dialogs.some(d => d.isShow) ? <div>{dialogs.map(({ Component }, i) => (<Component key={i} />))}</div> : null}
            {langLoading ? <LoadingScreen /> : (cookie.token ? (isLoading ? <LoadingScreen /> : <Home><RouterProvider router={router} /></Home>) : <LoginRegisterPage />)}
          </Box>
        </ThemeProvider>
      </CssBaseline>
    </div>
  )
}

export default App