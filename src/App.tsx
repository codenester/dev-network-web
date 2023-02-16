import { useContext, useEffect } from 'react';
import './App.css'
import { CookieContext } from './contexts';

function App() {
  const dialogs: any[] = [];
  const { cookie, setCookie, removeCookie } = useContext(CookieContext)
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
          </div> : <div></div>}
        </div>
      }
    </div>
  )
}

export default App