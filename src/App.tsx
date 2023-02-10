import { useSelector } from 'react-redux'
import './App.css'
import { TCookie, TDialogState } from './store'

function App() {
  const dialogs: TDialogState[] = useSelector((state: { dialogs: TDialogState[] }) => state.dialogs)
  const cookie: TCookie = useSelector((state: TCookie) => state);
  return (
    <div className="App">
      {dialogs.some(d => d.isShow) ?
        <div>
          {dialogs.map(({ Component }, i) => (<Component key={i} />))}
        </div> : <div>
          {cookie.token ? <div>
            Body
          </div> : <div>Login</div>}
        </div>
      }
    </div>
  )
}

export default App