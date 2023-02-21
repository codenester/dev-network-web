import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useMe } from './api/hook';
import './App.css'
import { CookieContext } from './contexts/cookie-context';
import { LocalStorageContext } from './contexts/local-storage-context';
import LoginRegisterPage from './pages/login-register';
import router from './routes/default-routes'

function App() {
  const dialogs: any[] = [];
  const { cookie } = useContext(CookieContext)
  const { localStorage } = useContext(LocalStorageContext)
  const theme = useMemo(() => createTheme({ palette: { mode: 'dark' } }), [localStorage.theme])
  const { refetch } = useMe({
    onError: err => console.log(err),
    onSuccess: async (res) => {
      console.log(res)
    }
  })
  useEffect(() => {
    if (cookie.token) {
      refetch()
    }
  }, [cookie.token])
  return (
    <div className="App">
      <CssBaseline enableColorScheme>
        <ThemeProvider theme={theme}>
          <Box sx={{ position: 'fixed', display: 'flex', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'background.default', p: 3, alignItems: 'center', justifyContent: 'center' }}>
            {dialogs.some(d => d.isShow) ?
              <div>
                {dialogs.map(({ Component }, i) => (<Component key={i} />))}
              </div> :
              (cookie.token ? <RouterProvider router={router} /> : <LoginRegisterPage />)
            }
          </Box>
        </ThemeProvider>
      </CssBaseline>
    </div>
  )
}

export default App