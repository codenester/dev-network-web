import { useContext, useEffect } from 'react';
import './App.css'
import { CookieContext } from './contexts/cookie-context';
import LoginRegisterPage from './pages/login-register';

function App() {
  const dialogs: any[] = [];
  const { cookie } = useContext(CookieContext)
  useEffect(() => {
    if (cookie.token) console.log(cookie.token)
  }, [cookie.token])
  return (
    <div className="App">
      {dialogs.some(d => d.isShow) ?
        <div>
          {dialogs.map(({ Component }, i) => (<Component key={i} />))}
        </div> : <div>
          {cookie.token ? <div>
            Body
          </div> : <LoginRegisterPage />}
        </div>
      }
    </div>
  )
}

export default App