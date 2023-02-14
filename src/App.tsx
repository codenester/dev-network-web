import { useContext, useEffect } from 'react';
import './App.css'
import { CookieContext } from './contexts';

function App() {
  const dialogs: any[] = [];
  const { cookie, setCookie, removeCookie } = useContext(CookieContext)
  const login = () => {
    const token = prompt('enter token')
    if (token) setCookie({ name: 'token', value: token })
  }
  const logout = () => {
    removeCookie('token')
  }
  useEffect(() => {
    console.log(cookie.token)
  }, [])
  return (
    <div className="App">
      {dialogs.some(d => d.isShow) ?
        <div>
          {dialogs.map(({ Component }, i) => (<Component key={i} />))}
        </div> : <div>
          {cookie.token ? <div>
            Body
            <button onClick={logout}>Logout</button>
          </div> : <div><button onClick={login}>Login</button></div>}
        </div>
      }
    </div>
  )
}

export default App